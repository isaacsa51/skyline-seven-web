var questionario = { 
    pregunta1: {
        pregunta:'¿Quién va a ser el beneficiado por el apoyo?',
        respuestas: [
                {
                    label: 'Asociado',
                    destino: 'pregunta2'
                },
                {
                    label: 'Familia directo',
                    destino: 'pregunta2'
                },
                {
                    label: 'Dependiente económico',
                    destino: 'pregunta2'
                },
                {
                    label: 'Otro',
                    destino: 'rejected',
                    rejectedMsg: 'Los apoyos de Fondo Naranja son para asociados,  familiares directos o dependientes económicos del asociado.'
                },
        ],
    },
    pregunta2: {
        pregunta:'¿Qué tipo de apoyo estas solictando?',
        respuestas: [
                {
                    label: 'Salud',
                    destino: 'pregunta3'
                },
                {
                    label: 'Aparato ortopédico',
                    destino: 'pregunta24'
                },
                {
                    label: 'Desastre natural',
                    destino: 'pregunta20'
                },
                {
                    label: 'Otro',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja cubre solamente apoyos de Salud, Aparatos Ortopédicos y afectaciones de viviendas por Desastres Naturales.'
                },
        ],
    },

    // CUESTIONARIO SALUD
    pregunta3: {
        pregunta:'¿Requiere apoyo para compra de medicamentos?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta4'
                },
                {
                    label: 'No',
                    destino: 'pregunta6'
                },
        ],
    },
    pregunta4: {
        pregunta:'¿Ya compraste el medicamento?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no realiza reembolsos'
                },
                {
                    label: 'No',
                    destino: 'pregunta5'
                },
        ],
    },
    pregunta5: {
        pregunta:'¿Cuentas con cotización de un establecimiento que emite factura?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 1
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización de un establecimiento que emita factura para poder atender el caso'
                },
        ],
    },
    pregunta6: {
        pregunta:'¿Requieres apoyo para algún estudio médico?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta7'
                },
                {
                    label: 'No',
                    destino: 'pregunta10'
                },
        ],
    },
    pregunta7: {
        pregunta:'¿Ya te realizaste el estudio médico?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no realiza reembolsos'
                },
                {
                    label: 'No',
                    destino: 'pregunta8'
                },
        ],
    },
    pregunta8: {
        pregunta:'¿Cuentas con estudio médico y cotización?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta9',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización'
                },
        ],
    },
    pregunta9: {
        pregunta:'¿La clínica en donde te realizarás el estudio emite factura?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 1
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización de un establecimiento que emita factura para poder atender el caso'
                },
        ],
    },
    pregunta10: {
        pregunta:'¿Requieres apoyo para alguna cirugía?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta11'
                },
                {
                    label: 'No',
                    destino: 'pregunta15'
                },
        ],
    },
    pregunta11: {
        pregunta:'¿Ya te realizaste la cirugía?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no realiza reembolsos'
                },
                {
                    label: 'No',
                    destino: 'pregunta12'
                },
        ],
    },
    pregunta12: {
        pregunta:'¿Cuentas con cotización?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta13',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización'
                },
        ],
    },
    pregunta13: {
        pregunta:'¿El doctor emite recibo de honorarios (retención de ISR)?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo naranja no cubre recibo de honorarios'
                },
                {
                    label: 'No',
                    destino: 'pregunta14',
                },
        ],
    },
    pregunta14: {
        pregunta:'¿El doctor emite factura (desglose de IVA)?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 1
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización'
                },
        ],
    },
    pregunta15: {
        pregunta:'¿Requires apoyo para algún tratamiento o terápia?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta16'
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Contacta a fondo naranja para que evaluen tu caso'
                },
        ],
    },
    pregunta16: {
        pregunta:'¿Ya te realizaste la cirugía?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no realiza reembolsos'
                },
                {
                    label: 'No',
                    destino: 'pregunta17'
                },
        ],
    },
    pregunta17: {
        pregunta:'¿Cuentas con cotización?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta18',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización'
                },
        ],
    },
    pregunta18: {
        pregunta:'¿El doctor emite recibo de honorarios (retención de ISR)?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo naranja no cubre recibo de honorarios'
                },
                {
                    label: 'No',
                    destino: 'pregunta19',
                },
        ],
    },
    pregunta19: {
        pregunta:'¿El doctor emite factura (desglose de IVA)?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 1
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización'
                },
        ],
    },

    // CUESTIONARIO DESASTRES NATURALES
    pregunta20: {
        pregunta:'¿Tuviste afectaciones en tu vivienda por algún desastre natural?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta21',
                },
                {
                    label: 'No',
                    destino: 'pregunta22',
                },
        ],
    },
    pregunta21: {
        pregunta:'¿El desastre natural fue tormenta tropical, sismo, lluvias fuertes, huracanes, incendios, tsunamis, tornados, volcanes, granizo?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 3
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja solamente cubre afectaciones en viviendas por desastres naturales. <br> Contacta a Fondo Naranja'
                },
        ],
    },
    pregunta22: {
        pregunta:'¿Tuviste afectaciones en tu vivienda por algún accidente?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta23',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Contacta a Fondo Naranja para que evaluen tu caso'
                },
        ],
    },
    pregunta23: {
        pregunta:'¿Hubo alguien lesionado?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 1
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no cubre afectaciones en las viviendas por accidentes'
                },
        ],
    },

    // CUESTIONARIO APARATO ORTOPÉDICOS
    pregunta24: {
        pregunta:'¿Requieres apoyo para compra de protesis, aparatos auditivos, silla de ruedas, accesorios médicos?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta25',
                },
                {
                    label: 'No',
                    destino: 'pregunta28',
                },
        ],
    },
    pregunta25: {
        pregunta:'¿Ya realizaste la compra?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no realiza reembolsos'
                },
                {
                    label: 'No',
                    destino: 'pregunta26',
                },
        ],
    },
    pregunta26: {
        pregunta:'¿Cuentas con estudio médico y cotización?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta27',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita estudio médico y cotización'
                },
        ],
    },
    pregunta27: {
        pregunta:'¿Cuentas con cotización de un establecimiento que emite factura?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 2
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización de un establecimiento que emita factura para poder atender el caso'
                },
        ],
    },
    pregunta28: {
        pregunta:'¿Requieres apoyo para lentes?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta29',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Contacta a fondo naranja para que evaluen tu caso'
                },
        ],
    },
    pregunta29: {
        pregunta:'¿Ya revisaste los beneficios de la empresa para ver si te aplica?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'rejected',
                    rejectedMsg: 'Fondo Naranja no realiza reembolsos'
                },
                {
                    label: 'No',
                    destino: 'pregunta30',
                },
        ],
    },
    pregunta30: {
        pregunta:'¿Ya compraste los Lentes?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'pregunta31',
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita estudio médico y cotización'
                },
        ],
    },
    pregunta31: {
        pregunta:'¿El establecimiento emite factura?',
        respuestas: [
                {
                    label: 'Sí',
                    destino: 'acepted',
                    requestType: 2
                },
                {
                    label: 'No',
                    destino: 'rejected',
                    rejectedMsg: 'Solicita cotización de un establecimiento que emita factura para poder atender el caso'
                },
        ],
    },
    
};