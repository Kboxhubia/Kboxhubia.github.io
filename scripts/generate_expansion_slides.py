import os
from PIL import Image, ImageDraw, ImageFont
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np

os.makedirs('assets/images/slides', exist_ok=True)
os.makedirs('/tmp/file_attachments/Presentacion', exist_ok=True)

slides_data = [
    {
        "num": 12,
        "title": "Geopolítica de Minerales Críticos & Cadenas de Suministro",
        "subtitle": "Análisis CAPEX de Refinamiento vs OPEX Logístico (2024 - 2026)",
        "theme": "earth_minerals",
        "bullets": [
            "Cobalto, Neodimio, Galio y Litio como activos estratégicos de soberanía tecnológica.",
            "CAPEX Intensivo: Construcción de refinerías de alta pureza (Retorno a 7-10 años).",
            "OPEX Resiliente: Mitigación de volatilidad en fletes y riesgos de disrupción geopolítica.",
            "Indicador Clave: 78% del procesamiento de Tierras Raras concentrado en mercados emergentes."
        ],
        "metrics": [("CAPEX Refinería", "$450M"), ("OPEX / Ton", "$1,200"), ("ROI Estimado", "18.4%"), ("Index ESG", "AAA")]
    },
    {
        "num": 13,
        "title": "Computación Cuántica & Hardware Criogénico",
        "subtitle": "Estructura Financiera: Qubits Superconductores vs Refrigeración mK",
        "theme": "quantum_space",
        "bullets": [
            "Inversión CAPEX: Criostatos de dilución a 15 milikelvin y líneas de microondas coactivas.",
            "Costos OPEX: Mantenimiento de Helio-3/Helio-4 y redundancia energética 24/7.",
            "Tolerancia a Fallos (FTQC): Escalabilidad a 10,000+ qubits físicos con corregibilidad lógica.",
            "Modelado de Portafolios: Simulación Monte Carlo cuántica con aceleración exponencial."
        ],
        "metrics": [("Dilution CAPEX", "$12.5M"), ("Power OPEX", "$850K/año"), ("Fidelidad Gate", "99.9%"), ("Qubits", "1,121")]
    },
    {
        "num": 14,
        "title": "Infraestructura Soberana de Inteligencia Artificial",
        "subtitle": "TCO de Clusters GPU/NPU de Aceleración Masiva",
        "theme": "ai_deeptech",
        "bullets": [
            "Estrategia H100/B200: Arquitectura de interconexión NVLink 900GB/s por nodo.",
            "Eficiencia PUE: Centros de datos con enfriamiento líquido directo al chip (DLC).",
            "Amortización de Hardware: Depreciación acelerada a 3 años frente a avances de silicona.",
            "Valores OPEX: 42% del costo total enfocado en energía y consumo térmico MW."
        ],
        "metrics": [("Cluster CAPEX", "$85M"), ("Eficiencia PUE", "1.12"), ("TFLOPS FP8", "18,000"), ("TCO 3 Yrs", "$118M")]
    },
    {
        "num": 15,
        "title": "Sostenibilidad ESG & Economía de Materiales Críticos",
        "subtitle": "Auditoría Financiera Verde y Reciclaje de Metales Nobres",
        "theme": "earth_green",
        "bullets": [
            "Economía Circular DeepTech: Extracción de Oro, Plata y Platino desde e-waste industrial.",
            "Reducción de Huella de Carbono: Disminución del 64% de CO2eq vs minería tradicional.",
            "Cumplimiento Regulatorio 2026: Taxonomía UE y estándares ISSB S1/S2 obligatorios.",
            "Tasa Interna de Retorno (TIR): Proyecto de valorización urbana con TIR > 24.5%."
        ],
        "metrics": [("Reciclaje Au/Pt", "94.2%"), ("TIR Verde", "24.5%"), ("Evitada CO2", "120 kt"), ("Riesgo ESG", "Bajo")]
    },
    {
        "num": 16,
        "title": "Modelos Financieros de Valoración Exit & M&A en DeepTech",
        "subtitle": "Múltiplos EV/EBITDA & Activos Intangibles Patentados",
        "theme": "finance_gold",
        "bullets": [
            "Valoración de Patentes: Algoritmos de flujo de caja descontado (DCF) aplicados a IP.",
            "Prima por DeepTech: Múltiplos EV/Revenue de 12x a 25x en fusiones estratégicas.",
            "Estrategias de Salida: IPO en mercados especializados vs Adquisición Corporativa.",
            "Protección de Capital: Claustros de Retención de Talento Fundador y Key Scientists."
        ],
        "metrics": [("EV / Rev Multi", "18.5x"), ("Patentes WIPO", "14"), ("IP DCF Value", "$310M"), ("IRR Target", "35%")]
    },
    {
        "num": 17,
        "title": "Arquitectura Agentic & Autonomía Algorítmica",
        "subtitle": "Orquestación RAG + MCP y Eficiencia Operativa de Software",
        "theme": "software_space",
        "bullets": [
            "Model Context Protocol (MCP): Conectividad segura multi-servicio sin fricción.",
            "Reducción de OPEX en Desarrollo: Automatización del 65% en refactorización y testing.",
            "DevSecOps Continuo: Integración de auditoría en tiempo real para entornos críticos.",
            "Escalabilidad Horizontal: Despliegue en microservicios contenerizados de baja latencia."
        ],
        "metrics": [("Productividad", "+240%"), ("Testing Auto", "98.5%"), ("Dev OPEX Cut", "-58%"), ("Uptime", "99.99%")]
    },
    {
        "num": 18,
        "title": "Visión Estratégica 2026-2030: El Futuro DeepTech",
        "subtitle": "Conclusiones Ejecutivas por el Ing. Jorge Huerta",
        "theme": "universe_deeptech",
        "bullets": [
            "Sinergia Espacio-Tierra-Tecnología: El triángulo de valor para la próxima década.",
            "Optimización CAPEX/OPEX: La clave para la rentabilidad de las empresas DeepTech.",
            "Liderazgo en Innovación: Aplicación rigurosa del razonamiento financiero y científico.",
            "Invitación a la Colaboración: Red global de CEOs, CFOs, CTOs e Investigadores."
        ],
        "metrics": [("Horizonte", "2026-2030"), ("Impacto Global", "Alto"), ("Soberanía Tech", "100%"), ("Estado", "Listo")]
    }
]

def generate_slide_image(slide):
    fig, ax = plt.subplots(figsize=(13.76, 7.68), dpi=100)
    fig.patch.set_facecolor('#070b19')
    ax.set_facecolor('#070b19')
    ax.set_xlim(0, 1376)
    ax.set_ylim(0, 768)
    ax.axis('off')

    # Background art (space dots & grid)
    np.random.seed(slide["num"])
    xs = np.random.randint(0, 1376, 120)
    ys = np.random.randint(0, 768, 120)
    sizes = np.random.rand(120) * 15 + 2
    alphas = np.random.rand(120) * 0.6 + 0.2
    colors = ['#00f2fe', '#4facfe', '#7f00ff', '#e0c3fc', '#ffffff']
    for x, y, s, a in zip(xs, ys, sizes, alphas):
        c = colors[np.random.randint(0, len(colors))]
        ax.scatter(x, y, s=s, color=c, alpha=a, edgecolors='none')

    # Subtle grid lines
    for gx in range(0, 1376, 100):
        ax.plot([gx, gx], [0, 768], color='#1a244d', linewidth=0.5, alpha=0.3)
    for gy in range(0, 768, 100):
        ax.plot([0, 1376], [gy, gy], color='#1a244d', linewidth=0.5, alpha=0.3)

    # Decorative header bar
    header_box = patches.FancyBboxPatch((40, 640), 1296, 95, boxstyle="round,pad=10,rounding_size=15",
                                        linewidth=1.5, edgecolor='#00f2fe', facecolor='#0d1b3e', alpha=0.85)
    ax.add_patch(header_box)

    # Slide Badge
    badge_box = patches.FancyBboxPatch((60, 675), 130, 40, boxstyle="round,pad=5,rounding_size=8",
                                       linewidth=1, edgecolor='#7f00ff', facecolor='#7f00ff', alpha=0.9)
    ax.add_patch(badge_box)
    ax.text(125, 693, f"LÁMINA {slide['num']}", color='#ffffff', fontsize=12, fontweight='bold', ha='center', va='center')

    # Main Title & Subtitle
    ax.text(210, 700, slide["title"], color='#ffffff', fontsize=18, fontweight='bold', ha='left', va='center')
    ax.text(210, 665, slide["subtitle"], color='#00f2fe', fontsize=13, fontstyle='italic', ha='left', va='center')

    # Author Branding Right
    ax.text(1310, 685, "Ing. Jorge Huerta", color='#e0c3fc', fontsize=13, fontweight='bold', ha='right', va='center')
    ax.text(1310, 663, "Kboxhubia DeepTech 2026", color='#8e9aaf', fontsize=10, ha='right', va='center')

    # Bullets Box
    bullet_box = patches.FancyBboxPatch((40, 160), 800, 450, boxstyle="round,pad=10,rounding_size=15",
                                        linewidth=1, edgecolor='#2a3c75', facecolor='#0b1536', alpha=0.8)
    ax.add_patch(bullet_box)

    ax.text(70, 575, "ANÁLISIS ESTRATÉGICO & METRICAS DE IMPACTO", color='#4facfe', fontsize=13, fontweight='bold')
    ax.plot([70, 810], [560, 560], color='#00f2fe', linewidth=1, alpha=0.7)

    y_pos = 510
    for b in slide["bullets"]:
        ax.scatter(85, y_pos+5, s=35, color='#00f2fe', marker='D')
        ax.text(105, y_pos, b, color='#e2e8f0', fontsize=12, ha='left', va='center', wrap=True)
        y_pos -= 90

    # Right Column: Metrics Cards
    x_metric = 870
    y_metric = 480
    for title, val in slide["metrics"]:
        m_box = patches.FancyBboxPatch((x_metric, y_metric), 466, 100, boxstyle="round,pad=10,rounding_size=12",
                                       linewidth=1.2, edgecolor='#7f00ff', facecolor='#151d42', alpha=0.9)
        ax.add_patch(m_box)
        ax.text(x_metric + 35, y_metric + 55, title, color='#94a3b8', fontsize=12, fontweight='bold')
        ax.text(x_metric + 35, y_metric + 25, val, color='#00f2fe', fontsize=22, fontweight='bold')
        ax.scatter(x_metric + 410, y_metric + 50, s=80, color='#7f00ff', alpha=0.6)
        y_metric -= 120

    # Footer Bar
    ax.plot([40, 1336], [80, 80], color='#1a244d', linewidth=1)
    ax.text(50, 45, "UNIVERSO • TIERRA & MINERALES • CIENCIA & TECNOLOGÍA DEEPTECH", color='#64748b', fontsize=10, fontweight='bold')
    ax.text(1326, 45, "Presentación Oficial LinkedIn | 2026", color='#00f2fe', fontsize=10, fontweight='bold', ha='right')

    plt.tight_layout()
    out_img = f"assets/images/slides/screen{slide['num']:02d}.png"
    out_tmp = f"/tmp/file_attachments/Presentacion/screen{slide['num']:02d}.png"
    plt.savefig(out_img, bbox_inches='tight', pad_inches=0, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.savefig(out_tmp, bbox_inches='tight', pad_inches=0, facecolor=fig.get_facecolor(), edgecolor='none')
    plt.close()

    # Resize exact 1376x768 if needed
    with Image.open(out_img) as img:
        img_resized = img.resize((1376, 768), Image.Resampling.LANCZOS)
        img_resized.save(out_img)
        img_resized.save(out_tmp)
    print(f"Generated slide {slide['num']} at {out_img}")

for s in slides_data:
    generate_slide_image(s)
