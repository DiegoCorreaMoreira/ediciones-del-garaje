// Netlify Function: suscribe a un email a tu lista de Brevo
// Se ejecuta cuando alguien envía el formulario del newsletter

exports.handler = async (event) => {
  // Solo aceptar POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  // Headers para CORS (permite que el formulario se envíe desde tu dominio)
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const { email, nombre } = JSON.parse(event.body);

    if (!email || !email.includes("@")) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Email inválido" }),
      };
    }

    // Estas variables las vas a configurar en Netlify (ahora te explico)
    const API_KEY = process.env.BREVO_API_KEY;
    const LIST_ID = parseInt(process.env.BREVO_LIST_ID, 10);

    if (!API_KEY || !LIST_ID) {
      console.error("Faltan variables de entorno BREVO_API_KEY o BREVO_LIST_ID");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: "Configuración incompleta del servidor" }),
      };
    }

    // Llamada a la API de Brevo para sumar el contacto
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        updateEnabled: true, // Si ya existe, lo actualiza
        attributes: nombre ? { NOMBRE: nombre } : {},
      }),
    });

    const data = await response.json();

    // Brevo devuelve 201 si lo creó, 204 si lo actualizó, o un error
    if (response.status === 201 || response.status === 204) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ok: true,
          message: "¡Gracias! Te suscribiste a las novedades de Ediciones del Garaje.",
        }),
      };
    }

    // Si el contacto ya existe pero está en la lista
    if (data.code === "duplicate_parameter") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          ok: true,
          message: "Ya estabas en la lista. ¡Gracias por seguirnos!",
        }),
      };
    }

    console.error("Error de Brevo:", data);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "No pudimos suscribirte. Probá de nuevo en unos minutos.",
      }),
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Error del servidor" }),
    };
  }
};
