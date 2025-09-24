import { useState } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { BookingCalendar } from "../components/ui/booking-calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTherapist, setSelectedTherapist] = useState('')
  const [sessionType, setSessionType] = useState('')

  const therapists = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', rating: 4.9 },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Trauma & PTSD', rating: 4.8 },
    { id: '3', name: 'Dr. Emily Rodriguez', specialty: 'Relationship Counseling', rating: 4.9 },
    { id: '4', name: 'Dr. David Kim', specialty: 'Addiction Recovery', rating: 4.7 },
  ]

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const sessionTypes = [
    { value: 'initial', label: 'Initial Consultation (60 min)', price: '$120' },
    { value: 'follow-up', label: 'Follow-up Session (50 min)', price: '$100' },
    { value: 'group', label: 'Group Therapy (90 min)', price: '$60' },
    { value: 'couples', label: 'Couples Therapy (60 min)', price: '$150' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book a Session</h1>
          <p className="text-muted-foreground">
            Schedule an appointment with one of our licensed mental health professionals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Details</CardTitle>
                <CardDescription>Choose your preferred session type and therapist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{type.label}</span>
                            <span className="text-primary font-semibold ml-4">{type.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="therapist">Therapist</Label>
                  <Select value={selectedTherapist} onValueChange={setSelectedTherapist}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists.map((therapist) => (
                        <SelectItem key={therapist.id} value={therapist.id}>
                          <div>
                            <div className="font-medium">{therapist.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {therapist.specialty} • ⭐ {therapist.rating}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>We'll use this to confirm your appointment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Let us know if you have any specific concerns or preferences..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Time Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred appointment slot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <BookingCalendar
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                  
                  {selectedDate && (
                    <div>
                      <Label>Available Times</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="text-sm"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedDate && selectedTime && sessionType && (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{selectedDate.toDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session:</span>
                    <span className="font-medium">
                      {sessionTypes.find(s => s.value === sessionType)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Therapist:</span>
                    <span className="font-medium">
                      {therapists.find(t => t.id === selectedTherapist)?.name}
                    </span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">
                      {sessionTypes.find(s => s.value === sessionType)?.price}
                    </span>
                  </div>
                  <Button className="w-full mt-4" size="lg">
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}