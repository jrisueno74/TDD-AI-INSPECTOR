export const capexDatabase = `Código	Categoría	Subcategoría	Elemento	Vida útil (años)	Unidad	Coste con factor (EUR)	Tipo de intervención habitual	Prioridad	Notas técnicas
PT-0001	Estructura	Cimientos y zapatas	Reparación puntual de cimientos y zapatas	100	m2	480,00 €	Reparación estructural	Muy alta	Saneo, pasivado, reposición y recrecido puntual
PT-0002	Estructura	Cimientos y zapatas	Recalce con micropilotes	80	ml	1.425,00 €	Refuerzo	Muy alta	Solución para asientos diferenciales o pérdida portante
PT-0003	Estructura	Forjados de hormigón	Reparación de forjado de hormigón armado	75	m2	277,50 €	Reparación estructural	Muy alta	Saneo de armaduras, mortero estructural y protección
PT-0004	Estructura	Forjados de hormigón	Refuerzo de forjado con fibra de carbono	30	m2	360,00 €	Refuerzo	Muy alta	Adecuado para incrementos moderados de carga
PT-0005	Estructura	Vigas de hormigón	Reparación de vigas de hormigón	75	Ud	630,00 €	Reparación estructural	Muy alta	Cosido, saneo y recrecido puntual
PT-0006	Estructura	Muros exteriores de hormigón	Reparación de muros exteriores	75	m2	75,00 €	Rehabilitación	Alta	Reparación de fisuras, desprendimientos y coqueras
PT-0007	Estructura	Estructura cubierta de hormigón	Reparación de estructura de cubierta	75	m2	315,00 €	Reparación estructural	Alta	Actuación sobre vigas, viguetas o losas en cubierta
PT-0008	Estructura	Muros interiores de hormigón	Muros de sótano	75	m2	240,00 €	Rehabilitación	Alta	Reparación e impermeabilización posterior
PT-0009	Estructura	Pilares de hormigón	Reparación de pilares	75	Ud	570,00 €	Reparación estructural	Muy alta	Saneo, pasivado, mortero estructural y recrecido
PT-0010	Estructura	Forjados de acero	Tratamiento anticorrosivo en cantos de forjado	50	m2	210,00 €	Protección	Alta	Limpieza, imprimación y esmalte o sistema equivalente
PT-0011	Estructura	Vigas de acero	Refuerzo y protección de vigas metálicas	50	Ud	720,00 €	Reparación estructural	Alta	Refuerzo local, soldadura y pintura intumescente si procede
PT-0012	Estructura	Muros exteriores de acero	Cerramiento estructural metálico exterior	50	m2	292,50 €	Sustitución parcial	Media	Reparación de perfilería y fijaciones
PT-0013	Estructura	Estructura cubierta de acero	Refuerzo de estructura de cubierta metálica	50	m2	337,50 €	Refuerzo	Alta	Sustitución parcial y tratamiento anticorrosivo
PT-0014	Estructura	Muros interiores de acero	Muros interiores de acero	50	m2	262,50 €	Sustitución parcial	Media	Perfilería auxiliar y chapa
PT-0015	Estructura	Pilares de acero	Refuerzo de pilares metálicos	50	Ud	780,00 €	Refuerzo	Muy alta	Camisas o chapas atornilladas/soldadas
PT-0016	Estructura	Juntas estructurales	Sellado y reposición de junta estructural	20	ml	142,50 €	Mantenimiento correctivo	Alta	Sellado elástico y protección de canto
PT-0017	Envolvente	Estabilidad de protección frente a caídas	Barandilla de protección reglamentaria	30	ml	217,50 €	Adecuación normativa	Alta	Sustitución o refuerzo para cumplimiento DB-SUA
PT-0018	Envolvente	Cubierta	Cubierta plana transitable	30	m2	150,00 €	Rehabilitación	Alta	Reparación de soporte, pendientes y acabado final
PT-0019	Envolvente	Cubierta	Cubierta inclinada de teja	35	m2	172,50 €	Rehabilitación	Alta	Levantado parcial, reposición de teja y lámina bajo teja
PT-0020	Envolvente	Impermeabilización cubierta	Impermeabilización bituminosa	25	m2	97,50 €	Sustitución	Alta	Sistema bicapa o equivalente
PT-0021	Envolvente	Impermeabilización cubierta	Impermeabilización sintética PVC/TPO	20	m2	117,00 €	Sustitución	Alta	Apta para cubiertas planas ligeras
PT-0022	Envolvente	Aislamiento cubierta	Aislamiento térmico de cubierta	25	m2	63,00 €	Mejora energética	Media	XPS/PIR o equivalente según sistema
PT-0023	Envolvente	Impermeabilización muros exteriores	Impermeabilización de muros enterrados	25	m2	124,50 €	Rehabilitación	Alta	Lámina drenante y protección
PT-0024	Envolvente	Fachada	Reparación de fachada enfoscada	30	m2	138,00 €	Rehabilitación	Alta	Picado, reparación y repintado
PT-0025	Envolvente	Fachada	Sistema SATE	30	m2	202,50 €	Mejora energética	Media	Incluye adhesivo, fijación y acabado
PT-0026	Envolvente	Fachada	Fachada ventilada	40	m2	315,00 €	Sustitución	Media	Sistema de subestructura y acabado exterior
PT-0027	Envolvente	Revestimientos/ sellados	Enfoscados en cerramientos	10	m2	75,00 €	Reparación	Media	Reposición de revestimiento continuo
PT-0028	Envolvente	Revestimientos/ sellados	Sellado de juntas de fachada	10	ml	27,00 €	Mantenimiento correctivo	Media	Retirada de sellante, fondo y sellado nuevo
PT-0029	Envolvente	Carpintería exterior	Carpintería de aluminio	25	Ud	3.750,00 €	Sustitución	Alta	Ventana o puerta balconera con RPT
PT-0030	Envolvente	Carpintería exterior	Carpintería de PVC	25	Ud	3.300,00 €	Sustitución	Alta	Prestaciones térmicas mejoradas
PT-0031	Envolvente	Carpintería exterior	Vidrio doble bajo emisivo	20	m2	247,50 €	Sustitución	Media	Acristalamiento de seguridad o control solar si procede
PT-0032	Envolvente	Protecciones solares	Persiana enrollable exterior	15	Ud	480,00 €	Sustitución	Media	Cajón, guías y lama de aluminio
PT-0033	Envolvente	Lucernarios	Lucernario de cubierta	20	Ud	1.425,00 €	Sustitución	Media	Incluye remates e impermeabilización
PT-0034	Envolvente	Bajantes pluviales	Canalón y bajante vistos	20	ml	48,00 €	Sustitución	Media	PVC o zinc según edificio
PT-0035	Obra secundaria	Paredes/ tabiques	Tabique de yeso laminado	30	m2	72,00 €	Sustitución	Media	Sistema con perfilería y lana mineral
PT-0036	Obra secundaria	Paredes/ tabiques	Tabique cerámico	50	m2	93,00 €	Sustitución	Media	Ladrillo hueco doble o similar
PT-0037	Obra secundaria	Techos y falsos techos	Falso techo continuo de yeso laminado	25	m2	124,50 €	Sustitución	Media	Acabado liso listo para pintar
PT-0038	Obra secundaria	Techos y falsos techos	Falso techo registrable	20	m2	87,00 €	Sustitución	Media	Útil en zonas de instalaciones
PT-0039	Obra secundaria	Pinturas	Pintura plástica en techos y paredes	12	m2	16,50 €	Repintado	Baja	Dos manos sobre soporte preparado
PT-0040	Obra secundaria	Pinturas	Pintura epoxi en zonas húmedas	10	m2	39,00 €	Repintado	Media	Adecuada para cocinas o cuartos húmedos
PT-0041	Obra secundaria	Revestimientos	Alicatado cerámico interior	25	m2	63,00 €	Sustitución	Media	Incluye adhesivo y rejuntado
PT-0042	Obra secundaria	Suelos	Suelo interior porcelánico básico	30	m2	52,50 €	Sustitución	Media	Formato medio, rodapié aparte
PT-0043	Obra secundaria	Suelos	Suelo interior porcelánico técnico	30	m2	79,50 €	Sustitución	Media	Mayor resistencia al desgaste
PT-0044	Obra secundaria	Suelos	Suelo interior de resina epoxi	25	m2	102,00 €	Sustitución	Media	Apto para industria ligera y aparcamiento
PT-0045	Obra secundaria	Suelos	Suelo interior de PVC/vinílico	15	m2	58,50 €	Sustitución	Media	Lamas o rollo para alto tránsito
PT-0046	Obra secundaria	Suelos	Tarima laminada AC5	15	m2	51,00 €	Sustitución	Baja	Solución rápida en oficinas o vivienda
PT-0047	Obra secundaria	Suelos	Suelo exterior antideslizante	30	m2	150,00 €	Sustitución	Alta	Terrazas y recorridos exteriores
PT-0048	Obra secundaria	Suelos	Tratamiento antideslizante	10	m2	27,00 €	Mejora de seguridad	Media	Aplicación química o mecánica
PT-0049	Obra secundaria	Carpintería interior	Puerta interior de madera	25	Ud	1.435,50 €	Sustitución	Media	Hoja, premarco, herrajes y tapajuntas
PT-0050	Obra secundaria	Carpintería interior	Puerta RF interior técnica	30	Ud	630,00 €	Sustitución	Alta	En cuartos técnicos o sectores de incendio
PT-0051	Obra secundaria	Carpintería interior	Mampara de vidrio interior	20	m2	277,50 €	Sustitución	Baja	Vidrio templado o laminado
PT-0052	Obra secundaria	Otros	Barandilla de vidrio	25	ml	337,50 €	Sustitución	Media	Con perfilería o pinzas según detalle
PT-0053	Obra secundaria	Otros	Barandilla de cerrajería	40	ml	210,00 €	Sustitución	Media	Acero galvanizado o pintado
PT-0054	Obra secundaria	Otros	Techo de vidrio	30	m2	630,00 €	Sustitución	Media	Incluye estructura auxiliar y estanqueidad
PT-0055	Obra secundaria	Otros	Cuarto técnico	50	Ud	10.500,00 €	Acondicionamiento	Alta	Partición, acabado, ventilación y puerta técnica
PT-0056	Obra secundaria	Escaleras	Reparación de peldañeado	30	ml	142,50 €	Rehabilitación	Media	Reposición de huellas/tabicas
PT-0057	Obra secundaria	Impermeabilización interior	Impermeabilización de zonas húmedas	15	m2	42,00 €	Rehabilitación	Media	Bajo pavimento y paramentos de ducha
PT-0058	Piscina	Piscina	Vaso de piscina	30	Ud	1.800,00 €	Rehabilitación	Alta	Revestimiento y reparación puntual de vaso
PT-0059	Piscina	Piscina	Coronación de piscina	20	ml	112,50 €	Sustitución	Media	Piezas perimetrales antideslizantes
PT-0060	Piscina	Duchas	Duchas de piscina	25	Ud	2.250,00 €	Sustitución	Media	Con grifería temporizada
PT-0061	Piscina	Accesos baño	Ascensor acuático	20	Ud	5.200,50 €	Adecuación accesibilidad	Alta	Ayuda al acceso PMR
PT-0062	Piscina	Accesos zona baño	Pavimento de acceso zona baño	20	m2	225,00 €	Rehabilitación	Media	Pavimento exterior clase 3
PT-0063	Piscina	Depuración	Equipo compacto de depuración	20	Ud	6.750,00 €	Sustitución	Alta	Bomba, filtro y colectores
PT-0064	Piscina	Piscina	Rejilla perimetral de rebosadero	15	ml	48,00 €	Sustitución	Media	PVC resistente a cloro
PT-0065	Equipamiento exterior	Pérgolas y toldos	Pérgola metálica	15	m2	330,00 €	Sustitución	Baja	Estructura ligera y pintura
PT-0066	Equipamiento exterior	Pérgolas y toldos	Toldo motorizado	10	Ud	2.475,00 €	Sustitución	Baja	Incluye motor y mando
PT-0067	Equipamiento exterior	Espacios verdes	Ajardinamiento básico	25	m2	48,00 €	Adecuación exterior	Baja	Tierra vegetal, plantación y riego inicial
PT-0068	Equipamiento exterior	Riego	Red de riego exterior	15	m2	18,00 €	Sustitución	Baja	Tubería, electroválvulas y difusores
PT-0069	Equipamiento exterior	Drenaje escorrentía	Canaleta y drenaje lineal	30	ml	72,00 €	Rehabilitación	Media	Recogida de aguas de escorrentía
PT-0070	Equipamiento exterior	Vallados	Cerramiento perimetral metálico	25	ml	142,50 €	Sustitución	Media	Malla o lamas según uso
PT-0071	Equipamiento exterior	Mobiliario exterior	Banco exterior	15	Ud	630,00 €	Sustitución	Baja	Hormigón polímero o madera técnica
PT-0072	Equipamiento exterior	Equipos frigoríficos exteriores	Unidad exterior de frío positivo	15	Ud	4.200,00 €	Sustitución	Media	Condensadora para cámara
PT-0073	Equipamiento exterior	Equipos frigoríficos exteriores	Unidad exterior de frío negativo	15	Ud	4.200,00 €	Sustitución	Media	Condensadora para congelación
PT-0074	Equipamiento exterior	Equipos frigoríficos exteriores	Enfriadora de cámaras	15	Ud	30.000,00 €	Sustitución	Alta	Equipo de producción de frío
PT-0075	Equipamiento interior	Mobiliario	Mobiliario de oficina	20	Ud	975,00 €	Sustitución	Baja	Puesto medio con mesa y almacenaje
PT-0076	Equipamiento interior	Restauración y mostradores	Mostrador de atención	20	ml	1.170,00 €	Sustitución	Baja	Frente acabado y encimera
PT-0077	Equipamiento interior	Frío negativo (Evaporadora)	Cámara frigorífica congeladora	25	Ud	4.200,00 €	Sustitución	Alta	Evaporadora y control
PT-0078	Equipamiento interior	Frío positivo (Evaporadora)	Cámara de frío positivo	25	Ud	4.200,00 €	Sustitución	Alta	Evaporadora y control
PT-0079	Equipamiento interior	Producción	Horno de pizzas	15	Ud	6.750,00 €	Sustitución	Media	Uso hostelero
PT-0080	Equipamiento interior	Producción	Cocina 4 fuegos	15	Ud	2.700,00 €	Sustitución	Media	Módulo profesional
PT-0081	Equipamiento interior	Producción	Mesa central de fuegos	20	Ud	18.000,00 €	Sustitución	Media	Bloque de cocción industrial
PT-0082	Equipamiento interior	Producción	Marmita	20	Ud	9.750,00 €	Sustitución	Media	Equipo industrial de cocción
PT-0083	Equipamiento interior	Producción	Sartén basculante	20	Ud	12.750,00 €	Sustitución	Media	Equipo industrial
PT-0084	Equipamiento interior	Producción	Máquina de hielo	15	Ud	2.250,00 €	Sustitución	Media	Equipo auxiliar de hostelería
PT-0085	Equipamiento interior	Producción	Horno convección grande	20	Ud	33.750,00 €	Sustitución	Media	Equipo de gran capacidad
PT-0086	Equipamiento interior	Lavado de cubertería y elementos de cocina	Lavavajillas de capota	15	Ud	7.200,00 €	Sustitución	Media	Equipo profesional
PT-0087	Equipamiento interior	Lavado de cubertería y elementos de cocina	Túnel de lavado industrial	20	Ud	69.000,00 €	Sustitución	Alta	Línea industrial de lavado
PT-0088	Equipamiento interior	Extracción de humos (Campana)	Campana extractora	20	Ud	8.850,00 €	Sustitución	Alta	Campana acero inoxidable
PT-0089	Equipamiento interior	Lavandería	Lavadora industrial	15	Ud	6.949,50 €	Sustitución	Media	Lavandería colectiva
PT-0090	Equipamiento interior	Lavandería	Secadora industrial	15	Ud	3.750,00 €	Sustitución	Media	Lavandería colectiva
PT-0091	Equipamiento interior	Lavandería	Equipo de planchado industrial	15	Ud	12.499,50 €	Sustitución	Media	Rodillo o similar
PT-0092	Equipamiento interior	Descalcificadores cocina	Descalcificador	15	Ud	1.500,00 €	Sustitución	Media	Tratamiento de agua
PT-0093	Equipamiento interior	Descalcificadores cocina	Depósito de agua descalcificada	25	Ud	1.950,00 €	Sustitución	Media	Acumulación auxiliar
PT-0094	Equipamiento interior	Descalcificadores cocina	Bombas de agua descalcificada	15	Ud	1.800,00 €	Sustitución	Media	Impulsión
PT-0095	Equipamiento interior	Descalcificadores cocina	Vaso de expansión	25	Ud	337,50 €	Sustitución	Baja	Elemento auxiliar
PT-0096	Electricidad	Centro de transformación	Transformador	30	Ud	23.550,00 €	Sustitución	Alta	Equipo MT/BT
PT-0097	Electricidad	Centro de transformación	Contador general	30	Ud	1.050,00 €	Sustitución	Media	Medida principal
PT-0098	Electricidad	Compensación reactiva	Batería de condensadores	15	Ud	8.100,00 €	Sustitución	Media	Mejora factor de potencia
PT-0099	Electricidad	Grupo electrógeno	Grupo electrógeno	25	Ud	21.450,00 €	Sustitución	Alta	Respaldo de suministro
PT-0100	Electricidad	Red de distribución	Canalizaciones eléctricas	30	ml	36,00 €	Sustitución	Media	Tubo, bandeja y accesorios
PT-0101	Electricidad	Red de distribución	Cableado de fuerza	25	ml	18,00 €	Sustitución	Media	Conductores y tendido
PT-0102	Electricidad	Mecanismos eléctricos	Interruptores y tomas de corriente	25	Ud	52,50 €	Sustitución	Baja	Mecanismo completo
PT-0103	Electricidad	Telecomunicaciones/SAI	SAI	25	Ud	10.200,00 €	Sustitución	Alta	Sistema de alimentación ininterrumpida
PT-0104	Electricidad	Alumbrado	Alumbrado interior LED	20	Ud	127,50 €	Sustitución	Baja	Luminaria completa
PT-0105	Electricidad	Alumbrado	Alumbrado exterior LED	20	Ud	217,50 €	Sustitución	Baja	Luminaria exterior
PT-0106	Electricidad	Celdas de media tensión	Celda de medida	25	Ud	3.600,00 €	Sustitución	Alta	Equipo MT
PT-0107	Electricidad	Celdas de media tensión	Celda de protección de transformador	25	Ud	23.400,00 €	Sustitución	Alta	Protección MT
PT-0108	Electricidad	Cuadros generales BT	Cuadro general CGBT	30	Ud	28.050,00 €	Sustitución	Alta	Cuadro general de baja tensión
PT-0109	Electricidad	Cuadros BT	Cuadro secundario BT	30	Ud	11.250,00 €	Sustitución	Media	Cuadro de distribución
PT-0110	Electricidad	Fotovoltaica	Inversor fotovoltaico	10	Ud	8.100,00 €	Sustitución	Media	Conversión DC/AC
PT-0111	Electricidad	Fotovoltaica	Panel fotovoltaico	20	m2	750,00 €	Sustitución	Media	Módulo FV
PT-0112	Electricidad	Puesta a tierra	Red de toma de tierra	25	Ud	2.475,00 €	Adecuación normativa	Alta	Picas, conductor y conexión
PT-0113	Electricidad	Protección atmosférica	Pararrayos	20	Ud	5.700,00 €	Adecuación normativa	Media	Captor, bajante y puesta a tierra
PT-0114	Electricidad	Movilidad eléctrica	Punto de recarga VE	15	Ud	2.175,00 €	Mejora	Media	Equipo AC mural con protecciones
PT-0115	Elevación	Ascensores	Ascensor eléctrico bajo consumo	20	Ud	30.000,00 €	Sustitución	Alta	Cabina, maniobra y guías
PT-0116	Elevación	Movilidad reducida	Plataforma vertical PMR	20	Ud	52.000,50 €	Adecuación accesibilidad	Alta	Elevador de movilidad reducida
PT-0117	Elevación	Montacargas	Montacargas	20	Ud	19.999,50 €	Sustitución	Media	Transporte de cargas
PT-0118	Elevación	Salvaescaleras	Silla salvaescaleras	12	Ud	8.700,00 €	Adecuación accesibilidad	Media	Tramo recto o curvo
PT-0119	Puertas automáticas	Puertas automáticas	Puerta corredera de vidrio	20	Ud	3.382,50 €	Sustitución	Media	Acceso peatonal
PT-0120	Puertas automáticas	Puerta motorizada	Puerta de garaje corredera	20	Ud	4.800,00 €	Sustitución	Media	Automatismo incluido
PT-0121	Puertas automáticas	Puerta motorizada	Puerta de garaje elevable/seccional	20	Ud	4.275,00 €	Sustitución	Media	Automatismo incluido
PT-0122	Puertas automáticas	Control de acceso vehicular	Barrera automática	15	Ud	2.475,00 €	Sustitución	Baja	Control de acceso
PT-0123	Fontanería	Equipamiento sanitario	WC / Urinarios	20	Ud	900,00 €	Sustitución	Media	Sanitario completo
PT-0124	Fontanería	Equipamiento sanitario	Lavabos	20	Ud	900,00 €	Sustitución	Media	Lavabo con grifería básica
PT-0125	Fontanería	Equipamiento sanitario	Duchas	20	Ud	900,00 €	Sustitución	Media	Plato, mampara y grifería según alcance
PT-0126	Fontanería	Equipamiento sanitario	Griferías de lavabo	20	Ud	600,00 €	Sustitución	Baja	Monomando o temporizada
PT-0127	Fontanería	Distribución agua sanitaria	Tubería multicapa/PPR	25	ml	27,00 €	Sustitución	Media	Red interior de AF/ACS
PT-0128	Fontanería	Distribución agua sanitaria	Colectores y llaves de corte	20	Ud	360,00 €	Sustitución	Media	Distribución sectorizada
PT-0129	Fontanería	Grupo de presión	Bombas	15	Ud	1.800,00 €	Sustitución	Alta	Bombas principales
PT-0130	Fontanería	Grupo de presión	Depósito de expansión	15	Ud	1.200,00 €	Sustitución	Media	Calderín
PT-0131	Fontanería	Grupo de presión	Grupo de presión completo	15	Ud	3.750,00 €	Sustitución	Alta	Equipo principal
PT-0132	Fontanería	Grupo de presión	Conexiones, colectores, bancadas y tuberías	20	Ud	4.200,00 €	Sustitución	Media	Accesorios del grupo
PT-0133	Fontanería	Grupo de presión	Regulador de cloro	20	Ud	3.649,50 €	Sustitución	Media	Dosificación
PT-0134	Fontanería	Grupo de presión	Descalcificador	20	Ud	1.950,00 €	Sustitución	Media	Tratamiento de agua
PT-0135	Fontanería	Grupo de presión	Bomba de achique	10	Ud	1.350,00 €	Sustitución	Alta	Sótanos o fosos
PT-0136	Fontanería	Distribución aguas fecales	Bajantes y tuberías visibles	30	ml	63,00 €	Sustitución	Media	PVC insonorizado o equivalente
PT-0137	Fontanería	Saneamiento agua	Arquetas y tapas	25	Ud	247,50 €	Sustitución	Media	Registro y limpieza
PT-0138	Fontanería	Saneamiento agua	Separador/decantadora de grasas	25	Ud	2.200,50 €	Sustitución	Media	Cocinas y hostelería
PT-0139	Fontanería	ACS	Calentador de agua / termo eléctrico	12	Ud	675,00 €	Sustitución	Baja	Solución puntual
PT-0140	Fontanería	ACS	Caldera mural pequeña	15	Ud	3.600,00 €	Sustitución	Media	Gas o similar
PT-0141	Fontanería	ACS	Caldera de potencia media	20	Ud	11.155,50 €	Sustitución	Alta	Producción de ACS/calefacción
PT-0142	Fontanería	ACS	Caldera de alta potencia	25	Ud	33.000,00 €	Sustitución	Alta	Equipo centralizado
PT-0143	Fontanería	ACS	Aerodisipador de seguridad	25	Ud	7.200,00 €	Sustitución	Media	Sistema auxiliar
PT-0144	Fontanería	ACS	Bomba de impulsión	15	Ud	1.800,00 €	Sustitución	Media	Circuito primario
PT-0145	Fontanería	ACS	Electrobomba	15	Ud	1.800,00 €	Sustitución	Media	Equipo auxiliar
PT-0146	Fontanería	ACS	Bomba de recirculación	15	Ud	1.350,00 €	Sustitución	Media	Retorno ACS
PT-0147	Fontanería	ACS	Vaso de expansión	25	Ud	469,50 €	Sustitución	Baja	Elemento auxiliar
PT-0148	Fontanería	ACS	Intercambiador pequeño	15	Ud	1.875,00 €	Sustitución	Media	Intercambio térmico
PT-0149	Fontanería	ACS	Intercambiador mediano	15	Ud	3.405,00 €	Sustitución	Media	Intercambio térmico
PT-0150	Fontanería	ACS	Filtro de partículas	25	Ud	975,00 €	Sustitución	Baja	Protección de circuito
PT-0151	Fontanería	ACS	Panel solar térmico	15	Ud	1.881,00 €	Sustitución	Media	Apoyo renovable
PT-0152	Fontanería	ACS	Depósito ACS	25	Ud	5.850,00 €	Sustitución	Media	Acumulación
PT-0153	Fontanería	ACS	Acumulador ACS por etapas	25	Ud	31.875,00 €	Sustitución	Alta	Gran demanda
PT-0154	Fontanería	ACS	Depósito de inercia	15	Ud	1.924,50 €	Sustitución	Media	Circuito hidráulico
PT-0155	Fontanería	Almacenamiento de agua	Aljibe de obra	25	Ud	10.500,00 €	Sustitución	Alta	Depósito enterrado/obra
PT-0156	Fontanería	Almacenamiento de agua	Aljibe prefabricado	25	Ud	3.750,00 €	Sustitución	Media	Depósito de acumulación
PT-0157	Fontanería	Almacenamiento de agua	Bomba de aljibe	15	Ud	1.350,00 €	Sustitución	Media	Impulsión
PT-0158	Fontanería	Almacenamiento de agua	Cloración de aljibe	15	Ud	3.499,50 €	Sustitución	Media	Tratamiento
PT-0159	Fontanería	Equipos de piscina	Equipo de piscina	25	Ud	6.750,00 €	Sustitución	Media	Conjunto de depuración
PT-0160	Fontanería	Depuración piscina	Filtro de piscina	25	Ud	850,50 €	Sustitución	Media	Elemento filtrante
PT-0161	Fontanería	Depuración piscina	Vaso de regulación	25	Ud	850,50 €	Sustitución	Media	Depósito auxiliar
PT-0162	Fontanería	Climatización piscina	Bomba de calor	20	Ud	27.000,00 €	Sustitución	Media	Calentamiento de piscina
PT-0163	Climatización	Ventilación	Extractor de recuperador de calor	25	Ud	6.450,00 €	Sustitución	Media	Recuperación energética
PT-0164	Climatización	Ventilación	Aportación de aire	25	Ud	5.490,00 €	Sustitución	Media	Impulsión de aire nuevo
PT-0165	Climatización	Ventilación	UTA	25	Ud	35.500,50 €	Sustitución	Alta	Unidad de tratamiento de aire
PT-0166	Climatización	Ventilación	Ventiladores	15	Ud	120,00 €	Sustitución	Baja	Ventilación puntual
PT-0167	Climatización	Termostatos	Termostatos	15	Ud	112,50 €	Sustitución	Baja	Control de temperatura
PT-0168	Climatización	Aire acondicionado	Split mural	18	Ud	840,00 €	Sustitución	Baja	Equipo doméstico/comercial ligero
PT-0169	Climatización	Aire acondicionado	Bomba de calor unidad interior	20	Ud	1.425,00 €	Sustitución	Media	Split/mini VRF
PT-0170	Climatización	Aire acondicionado	Bomba de calor unidad exterior	15	Ud	1.650,00 €	Sustitución	Media	Condensadora
PT-0171	Climatización	Aire acondicionado	Conductos de climatización	20	m2	72,00 €	Sustitución	Media	Conducto de chapa y aislamiento
PT-0172	Climatización	Exterior	Unidades exteriores VRV	20	Ud	22.500,00 €	Sustitución	Alta	Sistema variable refrigerante
PT-0173	Climatización	Exterior	Torre de refrigeración	20	Ud	38.500,50 €	Sustitución	Alta	Producción centralizada
PT-0174	Climatización	Exterior	Planta enfriadora de agua	20	Ud	100.000,50 €	Sustitución	Alta	Chiller de gran potencia
PT-0175	Climatización	Exterior	Enfriadora	15	Ud	30.000,00 €	Sustitución	Alta	Equipo frigorífico
PT-0176	Climatización	Exterior	Disipador de enfriadora	15	Ud	25.000,50 €	Sustitución	Media	Condensación/evacuación
PT-0177	Climatización	Exterior	Condensadora	15	Ud	9.750,00 €	Sustitución	Media	Equipo exterior
PT-0178	Climatización	Interior	Unidades interiores tipo cassette	20	Ud	7.650,00 €	Sustitución	Media	Unidad interior comercial
PT-0179	Climatización	Interior	Fan-coil	18	Ud	2.175,00 €	Sustitución	Media	Climatización hidrónica
PT-0180	Climatización	Suelo radiante	Suelo radiante/refrescante	30	m2	78,00 €	Sustitución	Media	Tubería, aislamiento y mortero
PT-0181	Climatización	Geotermia	Sistema geotérmico	50	Ud	63.000,00 €	Sustitución	Alta	Captación e intercambio
PT-0182	Extracción	Extracción de humos	Extractor de cocina	15	Ud	2.475,00 €	Sustitución	Alta	Cocina industrial
PT-0183	Extracción	Extracción de humos	Extractor de humo (PCI)	15	Ud	2.475,00 €	Sustitución	Alta	Evacuación de humos
PT-0184	Extracción	Conductos	Conductos de extracción	20	ml	142,50 €	Sustitución	Alta	Chapa galvanizada o EI según uso
PT-0185	Extracción	Chimeneas	Chimenea modular	20	ml	217,50 €	Sustitución	Media	Acero inoxidable o equivalente
PT-0186	Protección contra incendios	Puertas cortafuegos	Puerta cortafuegos	30	Ud	555,00 €	Sustitución	Alta	EI2 según necesidad
PT-0187	Protección contra incendios	Compuerta cortafuegos	Compuerta cortafuegos	25	Ud	630,00 €	Sustitución	Alta	Integración en conducto
PT-0188	Protección contra incendios	Señalización	Señalización fotoluminiscente	10	Ud	18,00 €	Sustitución	Media	Evacuación y equipos
PT-0189	Protección contra incendios	Señalización	Sirena	15	Ud	118,50 €	Sustitución	Media	Aviso acústico
PT-0190	Protección contra incendios	Sistemas de detección	Detector automático	10	Ud	67,50 €	Sustitución	Alta	Humo o temperatura
PT-0191	Protección contra incendios	Sistemas de detección	Pulsador manual	15	Ud	48,00 €	Sustitución	Media	Activación manual
PT-0192	Protección contra incendios	Aparato de respiración autónoma	Equipo ERA	5	Ud	1.425,00 €	Sustitución	Baja	Uso específico
PT-0193	Protección contra incendios	Alumbrado emergencia	Luminaria de emergencia	20	Ud	112,50 €	Sustitución	Alta	Autonomía reglamentaria
PT-0194	Protección contra incendios	Sistema de extinción	Extintores	10	Ud	67,50 €	Sustitución	Alta	Polvo o CO2
PT-0195	Protección contra incendios	Sistema de extinción	BIE	20	Ud	630,00 €	Sustitución	Alta	Boca de incendio equipada
PT-0196	Protección contra incendios	Sistema de extinción	Sistema de extinción automática CO2	10	Ud	2.850,00 €	Sustitución	Alta	Riesgos específicos
PT-0197	Protección contra incendios	Sistema de extinción	Sistema de rociadores	20	m2	84,00 €	Sustitución	Alta	Red húmeda automática
PT-0198	Protección contra incendios	Sistema de extinción	Extinción automática en campana de cocina	10	Ud	4.950,00 €	Sustitución	Alta	Cocinas profesionales
PT-0199	Protección contra incendios	Sistema de extinción	Hidrante exterior	20	Ud	2.475,00 €	Sustitución	Alta	Red exterior
PT-0200	Protección contra incendios	Sistema de extinción	Columna seca	20	Ud	3.949,50 €	Sustitución	Alta	Evacuación vertical
PT-0201	Protección contra incendios	Grupos y abastecimiento	Grupo de presión PCI	15	Ud	10.659,00 €	Sustitución	Alta	Bomba jockey + principal
PT-0202	Protección contra incendios	Grupos y abastecimiento	Aljibe PCI	30	Ud	7.950,00 €	Sustitución	Alta	Reserva contra incendios
PT-0203	Protección contra incendios	Control de seguridad	Central de alarma	15	Ud	3.750,00 €	Sustitución	Alta	Central de incendios
PT-0204	Combustibles	Depósitos de combustibles	Depósito GLP	30	Ud	13.050,00 €	Sustitución	Alta	Incluye accesorios de seguridad
PT-0205	Combustibles	Depósitos de combustibles	Depósito CO2	30	Ud	975,00 €	Sustitución	Media	Uso alimentario o específico
PT-0206	Combustibles	Depósitos de combustibles	Depósito de gasóleo	30	Ud	13.050,00 €	Sustitución	Alta	Acumulación combustible
PT-0207	Combustibles	Trasiego	Bomba de trasiego	15	Ud	1.800,00 €	Sustitución	Media	Impulsión
PT-0208	Combustibles	Alimentación	Bomba de alimentación a calderas	15	Ud	1.200,00 €	Sustitución	Media	Circuito de combustible
PT-0209	Combustibles	Distribución	Red de distribución de gas	35	ml	42,00 €	Sustitución	Alta	Tubería, válvulas y pruebas
PT-0210	Combustibles	Seguridad	Detector y electroválvula de gas	15	Ud	975,00 €	Adecuación normativa	Alta	Corte de seguridad
PT-0211	Telecomunicaciones	Red de datos	Cableado estructurado Cat6	15	punto	142,50 €	Sustitución	Baja	Punto de red completo
PT-0212	Telecomunicaciones	Red de datos	Rack de comunicaciones	15	Ud	1.875,00 €	Sustitución	Media	Armario mural o pie
PT-0213	Telecomunicaciones	WiFi	Punto de acceso WiFi	8	Ud	420,00 €	Sustitución	Baja	Cobertura inalámbrica
PT-0214	Telecomunicaciones	CCTV	Cámara IP	10	Ud	315,00 €	Sustitución	Media	Videovigilancia
PT-0215	Telecomunicaciones	Control de accesos	Lector y cerradura electromagnética	12	Ud	630,00 €	Sustitución	Media	Control de paso
PT-0216	Telecomunicaciones	Interfonía/videoportero	Videoportero	12	Ud	720,00 €	Sustitución	Baja	Acceso peatonal
PT-0217	Urbanización	Pavimentos exteriores	Solera de hormigón exterior	30	m2	63,00 €	Rehabilitación	Media	Base y acabado fratasado
PT-0218	Urbanización	Pavimentos exteriores	Adoquín prefabricado	30	m2	87,00 €	Rehabilitación	Media	Con cama de arena
PT-0219	Urbanización	Bordillos	Bordillo prefabricado	30	ml	33,00 €	Sustitución	Baja	Delimitación de viales
PT-0220	Urbanización	Redes pluviales	Canalización pluvial exterior	30	ml	54,00 €	Sustitución	Media	Tubería enterrada
PT-0221	Urbanización	Señalización	Pintura vial y señalización horizontal	5	m2	13,50 €	Mantenimiento correctivo	Baja	Aparcamientos y recorridos
PT-0222	Urbanización	Vallado	Puerta peatonal exterior	20	Ud	1.275,00 €	Sustitución	Baja	Metálica galvanizada
PT-0223	Urbanización	Vallado	Puerta corredera exterior	20	Ud	3.375,00 €	Sustitución	Media	Acceso rodado
PT-0224	Urbanización	Jardinería	Tierra vegetal y plantación arbustiva	20	m2	27,00 €	Adecuación exterior	Baja	Exterior ajardinado
PT-0225	Accesibilidad	Recorridos accesibles	Rampa PMR	30	m2	217,50 €	Adecuación normativa	Alta	Pendiente y mesetas según normativa
PT-0226	Accesibilidad	Recorridos accesibles	Pavimento podotáctil	20	m2	102,00 €	Adecuación normativa	Media	Señalización táctil
PT-0227	Accesibilidad	Aseos accesibles	Adaptación completa de aseo PMR	20	Ud	5.700,00 €	Adecuación normativa	Alta	Sanitarios, barras y espacio de giro
PT-0228	Accesibilidad	Aseos accesibles	Barra de apoyo abatible/fija	15	Ud	187,50 €	Adecuación normativa	Media	Accesorio accesibilidad
PT-0229	Accesibilidad	Señalética accesible	Señalética braille/alto relieve	12	Ud	72,00 €	Adecuación normativa	Baja	Apoyo visual y táctil
PT-0230	Accesibilidad	Accesos	Automatización de puerta de acceso	15	Ud	2.175,00 €	Adecuación normativa	Media	Operador para accesibilidad`;
