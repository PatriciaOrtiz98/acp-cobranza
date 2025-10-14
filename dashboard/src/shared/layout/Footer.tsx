import '../../styles/footer.css';

export default function Footer() {
  return (
    <footer className="layout-footer">
      <p className="layout-footer-text">
        © {new Date().getFullYear()} ACP Cobranza. Todos los derechos reservados.
      </p>
    </footer>
  );
}