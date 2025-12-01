import { NextResponse } from "next/server"

<<<<<<< HEAD
// Simulated data - Replace this with actual AWS data fetching
export async function GET() {
  // TODO: Replace with actual AWS endpoint
  // const response = await fetch('YOUR_AWS_ENDPOINT')
  // const data = await response.json()

  const personCount = Math.floor(Math.random() * 8) // 0-7 personas

  const detections = Array.from({ length: personCount }, () => ({
    x: Math.random() * 10,
    y: Math.random() * 10,
    timestamp: new Date().toISOString(),
  }))

  const motionDetected = personCount > 0

  // Simulated sensor data for demonstration
  const mockData = {
    sensor_id: "Sensor_E01",
    person_count: personCount,
    motion_detected: motionDetected,
    timestamp: new Date().toISOString(),
    detections: detections,
  }

  return NextResponse.json(mockData)
}

// POST endpoint to receive data from AWS
=======
// Variable global donde guardaremos el ÚLTIMO dato real recibido
let lastSensorData = {
  sensor_id: "Sensor_E01",
  person_count: 0,
  motion_detected: false,
  timestamp: new Date().toISOString(),
  detections: []
}

// GET → Devuelve SIEMPRE el último dato real recibido
export async function GET() {
  return NextResponse.json(lastSensorData)
}

// POST → Recibe datos REALES desde tu sensor o desde AWS
>>>>>>> origin/main
export async function POST(request: Request) {
  try {
    const data = await request.json()

<<<<<<< HEAD
    console.log("[v0] Received sensor data from AWS:", data)

    // TODO: Store in database or process the data
    // You can add validation here
    if (!data.sensor_id || typeof data.person_count !== "number") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Data received successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error processing sensor data:", error)
=======
    console.log("[v0] Received REAL sensor data:", data)

    // Validación básica
    if (typeof data.person_count !== "number") {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 })
    }

    // Actualizamos los datos reales
    lastSensorData = {
      sensor_id: data.sensor_id || "Sensor_E01",
      person_count: data.person_count,
      motion_detected: data.person_count > 0,
      timestamp: new Date().toISOString(),
      detections: data.detections || []
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error:", error)
>>>>>>> origin/main
    return NextResponse.json({ error: "Failed to process data" }, { status: 500 })
  }
}
