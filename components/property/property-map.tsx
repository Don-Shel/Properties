"use client"

interface PropertyMapProps {
  latitude: number
  longitude: number
  title: string
}

export default function PropertyMap({ latitude, longitude, title }: PropertyMapProps) {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.8${latitude}${longitude}!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${latitude}%2C${longitude}!5e0!3m2!1sen!2ske!4v1234567890`

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-border">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
        title={`Map location for ${title}`}
      />
    </div>
  )
}
