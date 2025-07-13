import React from "react";

const Footer: React.FC = () => (
    <footer style={{ background: "#222", color: "#fff", padding: "2rem 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {/* About */}
            <div style={{ flex: "1 1 200px", margin: "1rem" }}>
                <h3 style={{ color: "#fff" }}>Sobre Nosotros</h3>
                <p>
                    Somos una tienda online dedicada a ofrecer los mejores productos al mejor precio. Calidad y atención personalizada para tu experiencia de compra.
                </p>
            </div>
            {/* Links */}
            <div style={{ flex: "1 1 150px", margin: "1rem" }}>
                <h3 style={{ color: "#fff" }}>Enlaces</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li><a href="/shop" style={{ color: "#fff", textDecoration: "none" }}>Tienda</a></li>
                    <li><a href="/about" style={{ color: "#fff", textDecoration: "none" }}>Quiénes Somos</a></li>
                    <li><a href="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contacto</a></li>
                    <li><a href="/faq" style={{ color: "#fff", textDecoration: "none" }}>Preguntas Frecuentes</a></li>
                </ul>
            </div>
            {/* Contact */}
            <div style={{ flex: "1 1 200px", margin: "1rem" }}>
                <h3 style={{ color: "#fff" }}>Contacto</h3>
                <p>Email: info@ecommerce.com</p>
                <p>Tel: +34 123 456 789</p>
                <p>Dirección: Calle Falsa 123, Ciudad, País</p>
            </div>
            {/* Social */}
            <div style={{ flex: "1 1 150px", margin: "1rem" }}>
                <h3 style={{ color: "#fff" }}>Síguenos</h3>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>Twitter</a>
                </div>
            </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "2rem", borderTop: "1px solid #444", paddingTop: "1rem", fontSize: "0.9rem" }}>
            &copy; {new Date().getFullYear()} Ecommerce. Todos los derechos reservados.
        </div>
    </footer>
);

export default Footer;