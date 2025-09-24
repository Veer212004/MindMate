"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"

export function BookingCalendar({ counselorId, onTimeSelect }) {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  // Mock available slots
  const availableSlots = {
    "2025-01-15": ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
    "2025-01-16": ["11:00 AM", "1:00 PM", "4:00 PM"],
    "2025-01-17": ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"],
  }

  const handleTimeSelection = (date, time) => {
    setSelectedDate(date)
    setSelectedTime(time)
    onTimeSelect({ date, time })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Times</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(availableSlots).map(([date, times]) => (
            <div key={date} className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {times.map((time) => (
                  <Button
                    key={`${date}-${time}`}
                    variant={selectedDate === date && selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeSelection(date, time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

