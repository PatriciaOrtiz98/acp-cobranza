---

# 📦 Módulo `cobros`

Este módulo gestiona el registro, reversión y monitoreo de pagos realizados desde visitas operativas. Está diseñado para garantizar trazabilidad completa, reversibilidad institucional y generación de alertas automatizadas.

---

## 🧠 Objetivo

- Registrar pagos desde visitas confirmadas
- Revertir pagos con auditoría
- Generar cortes financieros diarios por gestor
- Emitir alertas automáticas de pago próximo
- Confirmar pagos vía webhook Conekta

---

## 🗂️ Estructura de tablas

### `cobros.pagos`
Registra pagos realizados durante visitas.

| Campo           | Tipo        | Descripción                                             |
|-----------------|-------------|---------------------------------------------------------|
| id_pago         | SERIAL      | Identificador único del pago                            |
| id_cliente      | INT         | Cliente asociado al pago                                |
| id_paso         | INT         | Paso de ruta que originó el pago                        |
| id_venta        | INT         | Venta asociada al pago                                  |
| monto           | NUMERIC     | Monto pagado                                            |
| metodo          | TEXT        | Método de pago (`efectivo`, `transferencia`, `tarjeta`) |
| registrado_por  | INT         | Usuario que registró el pago                            |
| registrado_en   | TIMESTAMP   | Fecha de registro                                       |
| observaciones   | TEXT        | Comentarios adicionales                                 |

---

### `cobros.reversiones`
Auditoría de pagos revertidos.

| Campo             | Tipo        | Descripción                                 |
|-------------------|-------------|---------------------------------------------|
| id_reversion      | SERIAL      | Identificador único de la reversión         |
| id_pago_original  | INT         | ID del pago revertido                       |
| monto_revertido   | NUMERIC     | Monto revertido                             |
| motivo            | TEXT        | Justificación institucional                 |
| revertido_por     | INT         | Usuario que ejecutó la reversión            |
| revertido_en      | TIMESTAMP   | Fecha de reversión                          |

---

## ⚙️ Funciones

### `registrar_pago_desde_visita(p_id_paso, p_monto, p_metodo, p_usuario, p_observaciones)`
Registra un pago desde una visita confirmada.  
- Valida que el paso esté confirmado (`paso = true`)
- Detecta venta con saldo pendiente
- Inserta en `ventas.pagos_cliente` con `estado_pago = 'pagado'`
- Inserta en `cobros.pagos` con trazabilidad completa

---

### `revertir_pago(p_id_pago, p_monto, p_motivo, p_usuario)`
Reversión institucional de un pago.  
- Inserta en `cobros.reversiones`
- Actualiza `ventas.ventas.saldo_pendiente` si es editable

---

### `corte_financiero_diario(p_id_gestor)`
Genera resumen diario por gestor.  
- Total de pasos visitados
- Total de pagos registrados
- Monto total recaudado

---

### `generar_alertas_pago_proximo(p_dias_anticipacion)`
Emite alertas automáticas para clientes con pagos próximos.  
- Control de duplicados vía `hash_alerta`
- Integración con `ventas.pagos_conekta` y `auditoria.alertas_enviadas`

---

### `confirmar_pago_conekta(p_id_transaccion, p_monto, p_fecha, p_id_cliente)`
Webhook para confirmar pagos desde Conekta.  
- Actualiza estado en `ventas.pagos_conekta`
- Marca alerta como confirmada o genera alerta de inconsistencia

---

## 🧪 Endpoints

| Método | URL                          | Descripción                      |
|--------|------------------------------|----------------------------------|
| POST   | `/cobros/pago-visita`        | Registrar pago desde visita      |
| POST   | `/cobros/revertir`           | Revertir pago institucional      |
| POST   | `/cobros/corte`              | Generar corte financiero diario  |

---

## 🧾 Recomendaciones institucionales

- Validar `paso = true` antes de registrar pagos
- Usar `estado_pago = 'pagado'` para pagos confirmados
- Registrar reversiones con motivo y usuario
- No modificar manualmente columnas generadas (`saldo_pendiente`)
- Documentar cada función con ejemplos y casos límite

---