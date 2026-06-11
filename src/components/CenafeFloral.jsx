/* Cenefa de flores bordadas estilo oaxaqueño */

function Flor({ cx, cy, c1, c2, c3 }) {
  const angulos8 = [0, 45, 90, 135, 180, 225, 270, 315];
  const angulosMed = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  return (
    <g>
      {/* Pétalos exteriores grandes */}
      {angulos8.map((a) => (
        <path
          key={`pe${a}`}
          d={`M ${cx},${cy} L ${cx + 14},${cy - 9} L ${cx + 36},${cy} L ${cx + 14},${cy + 9} Z`}
          fill={c1}
          transform={`rotate(${a},${cx},${cy})`}
        />
      ))}

      {/* Pétalos interiores (entre los grandes) */}
      {angulosMed.map((a) => (
        <path
          key={`pi${a}`}
          d={`M ${cx},${cy} L ${cx + 9},${cy - 5} L ${cx + 21},${cy} L ${cx + 9},${cy + 5} Z`}
          fill={c2}
          transform={`rotate(${a},${cx},${cy})`}
        />
      ))}

      {/* Puntitos decorativos en la punta de cada pétalo grande */}
      {angulos8.map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <circle
            key={`pd${i}`}
            cx={cx + 42 * Math.cos(rad)}
            cy={cy + 42 * Math.sin(rad)}
            r={3.5}
            fill={c2}
          />
        );
      })}

      {/* Centro: aro exterior, blanco, punto */}
      <circle cx={cx} cy={cy} r={13} fill={c3} />
      <circle cx={cx} cy={cy} r={8} fill="white" />
      <circle cx={cx} cy={cy} r={4} fill={c1} />
    </g>
  );
}

function Diamante({ cx, cy, size = 20, color, acento }) {
  const p = (dx, dy) => `${cx + dx},${cy + dy}`;
  return (
    <g>
      <polygon
        points={`${p(0, -size)} ${p(size, 0)} ${p(0, size)} ${p(-size, 0)}`}
        fill={color}
      />
      <polygon
        points={`${p(0, -size * 0.52)} ${p(size * 0.52, 0)} ${p(0, size * 0.52)} ${p(-size * 0.52, 0)}`}
        fill={acento}
      />
      <circle cx={cx} cy={cy} r={4.5} fill={color} />
    </g>
  );
}

function CenafeFloral() {
  // Segmentos de línea que unen flores con diamantes
  const lineas = [
    [127, 160], [200, 233],   // entre flor1 y flor2
    [307, 340], [380, 413],   // entre flor2 y flor3
    [487, 520], [560, 593],   // entre flor3 y flor4
    [667, 700], [740, 773],   // entre flor4 y flor5
  ];

  return (
    <svg
      viewBox="0 0 900 166"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "780px" }}
      aria-label="Cenefa floral oaxaqueña"
      role="img"
    >
      <defs>
        {/* Franja de triángulos superior */}
        <pattern
          id="triTop"
          x="0" y="0"
          width="80" height="18"
          patternUnits="userSpaceOnUse"
        >
          <polygon points="0,0 20,0 10,18"  fill="#c2185b" />
          <polygon points="20,0 40,0 30,18" fill="#2e7d32" />
          <polygon points="40,0 60,0 50,18" fill="#f9a825" />
          <polygon points="60,0 80,0 70,18" fill="#1565c0" />
        </pattern>

        {/* Franja de triángulos inferior (invertida) */}
        <pattern
          id="triBot"
          x="0" y="0"
          width="80" height="18"
          patternUnits="userSpaceOnUse"
        >
          <polygon points="0,18 20,18 10,0"  fill="#c2185b" />
          <polygon points="20,18 40,18 30,0" fill="#2e7d32" />
          <polygon points="40,18 60,18 50,0" fill="#f9a825" />
          <polygon points="60,18 80,18 70,0" fill="#1565c0" />
        </pattern>
      </defs>

      {/* Fondo del cuerpo central */}
      <rect x="0" y="18" width="900" height="130" fill="#fffaf7" />

      {/* Rayas decorativas superior */}
      <rect x="0" y="18" width="900" height="4"  fill="#c2185b" />
      <rect x="0" y="22" width="900" height="2"  fill="#f9a825" />
      <rect x="0" y="24" width="900" height="1"  fill="#2e7d32" />

      {/* Rayas decorativas inferior */}
      <rect x="0" y="141" width="900" height="1"  fill="#2e7d32" />
      <rect x="0" y="142" width="900" height="2"  fill="#f9a825" />
      <rect x="0" y="144" width="900" height="4"  fill="#c2185b" />

      {/* Bordes de triángulos */}
      <rect x="0" y="0"   width="900" height="18" fill="url(#triTop)" />
      <rect x="0" y="148" width="900" height="18" fill="url(#triBot)" />

      {/* Líneas de hilo entre flores y diamantes */}
      {lineas.map(([x1, x2], i) => (
        <g key={i}>
          <line x1={x1} y1={83} x2={x2} y2={83} stroke="#c2185b" strokeWidth="2.5" />
          <line x1={x1} y1={77} x2={x2} y2={77} stroke="#2e7d32" strokeWidth="1.5" />
          <line x1={x1} y1={89} x2={x2} y2={89} stroke="#2e7d32" strokeWidth="1.5" />
        </g>
      ))}

      {/* Diamantes conectores */}
      <Diamante cx={180} cy={83} size={20} color="#2e7d32" acento="#f9a825" />
      <Diamante cx={360} cy={83} size={20} color="#1565c0" acento="#e91e8c" />
      <Diamante cx={540} cy={83} size={20} color="#c62828" acento="#2e7d32" />
      <Diamante cx={720} cy={83} size={20} color="#6a1b9a" acento="#ff9800" />

      {/* ── Flores ── */}
      <Flor cx={90}  cy={83} c1="#e91e8c" c2="#f9a825" c3="#b71c1c" />
      <Flor cx={270} cy={83} c1="#ff5722" c2="#2e7d32" c3="#bf360c" />
      <Flor cx={450} cy={83} c1="#f9a825" c2="#e91e8c" c3="#e65100" />
      <Flor cx={630} cy={83} c1="#1565c0" c2="#f9a825" c3="#0d47a1" />
      <Flor cx={810} cy={83} c1="#6a1b9a" c2="#ff5722" c3="#4a148c" />
    </svg>
  );
}

export default CenafeFloral;
