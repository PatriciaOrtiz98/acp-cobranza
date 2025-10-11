import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ruta } from './entities/ruta.entity';
import { AsignacionRuta } from './entities/asignacion.entity';
import { PasoRuta } from './entities/paso.entity';
import { CorteDiario } from './entities/corte.entity';
import { AlertaEnviada } from './entities/alerta.entity';
import { CrearRutaDto } from './dto/crear-ruta.dto';
import { AsignarClienteDto } from './dto/asignar-cliente.dto';
import { RegistrarPasoDto } from './dto/registrar-paso.dto';
import { RevertirPasoDto } from './dto/revertir-paso.dto';
import { calcularCorte } from './utils/funciones-corte';
import { construirAlerta } from './utils/funciones-alerta';
import { construirReversion } from './utils/funciones-reversion';
import { VistaMapaEstado } from './interfaces/vista-mapa.interface';

@Injectable()
export class RutasService {
  constructor(
    @InjectRepository(Ruta)
    private readonly rutaRepo: Repository<Ruta>,

    @InjectRepository(AsignacionRuta)
    private readonly asignacionRepo: Repository<AsignacionRuta>,

    @InjectRepository(PasoRuta)
    private readonly pasoRepo: Repository<PasoRuta>,

    @InjectRepository(CorteDiario)
    private readonly corteRepo: Repository<CorteDiario>,

    @InjectRepository(AlertaEnviada)
    private readonly alertaRepo: Repository<AlertaEnviada>,
  ) {}

  async crearRuta(dto: CrearRutaDto) {
    const ruta = this.rutaRepo.create(dto);
    return await this.rutaRepo.save(ruta);
  }

  async asignarCliente(dto: AsignarClienteDto) {
    const asignacion = this.asignacionRepo.create(dto);
    return await this.asignacionRepo.save(asignacion);
  }

  async registrarPaso(dto: RegistrarPasoDto) {
    const paso = this.pasoRepo.create(dto);
    const resultado = await this.pasoRepo.save(paso);

    const alerta = construirAlerta(paso);
    if (alerta) {
      const auditoria = this.alertaRepo.create({
        id_ruta: dto.id_asignacion,
        id_gestor: dto.registrado_por,
        tipo_alerta: alerta.tipo_alerta,
        destinatario: dto.registrado_por.toString(),
        contenido: alerta.mensaje,
        estado_envio: 'pendiente',
      });
      await this.alertaRepo.save(auditoria);
    }

    return resultado;
  }

  async generarCorteDiario(id_gestor: number) {
    const hoy = new Date().toISOString().slice(0, 10);

    const pasos = await this.pasoRepo.find({
      where: {
        registrado_por: id_gestor,
        fecha: hoy as unknown as Date, // TypeORM espera Date, pero usamos string para compatibilidad
      },
    });

    const resumen = calcularCorte(pasos);

    const corte = this.corteRepo.create({
      id_gestor,
      fecha: hoy,
      total_clientes: resumen.total_clientes,
      visitados: resumen.visitados,
      paso_cercano: resumen.paso_cercano,
      omitidos: resumen.omitidos,
      confirmado: resumen.confirmado,
      generado_por: id_gestor,
    });

    return await this.corteRepo.save(corte);
  }

  async confirmarCorteDiario(id_gestor: number) {
    const hoy = new Date().toISOString().slice(0, 10);

    let corte = await this.corteRepo.findOne({
      where: {
        id_gestor,
        fecha: hoy,
      },
    });

    if (!corte) {
      await this.generarCorteDiario(id_gestor);
      corte = await this.corteRepo.findOne({
        where: {
          id_gestor,
          fecha: hoy,
        },
      });
    }

    const omitidos = await this.pasoRepo.count({
      where: {
        registrado_por: id_gestor,
        fecha: hoy as unknown as Date,
        paso: false,
        paso_cercano: false,
      },
    });

    if (omitidos > 0) {
      throw new Error(
        'No se puede confirmar corte: hay clientes omitidos sin justificación',
      );
    }

    return await this.corteRepo.update(
      { id_gestor, fecha: hoy },
      { confirmado: true },
    );
  }

  async revertirPaso(dto: RevertirPasoDto) {
    const paso = await this.pasoRepo.findOne({
      where: { id_paso: dto.id_paso },
    });

    if (!paso) {
      throw new Error('Paso no encontrado');
    }

    const auditoria = this.alertaRepo.create(
      construirReversion(paso, dto.motivo, dto.usuario),
    );
    await this.alertaRepo.save(auditoria);

    paso.paso = false;
    paso.paso_cercano = false;
    paso.observaciones = `${paso.observaciones ?? ''} | Revertido: ${dto.motivo}`;

    return await this.pasoRepo.save(paso);
  }

  async obtenerVistaMapa(id_ruta: number): Promise<VistaMapaEstado[]> {
    const resultado: VistaMapaEstado[] = await this.pasoRepo.query(
      `SELECT * FROM rutas.vista_mapa_estado WHERE id_ruta = $1`,
      [id_ruta],
    );
    return resultado;
  }
}
