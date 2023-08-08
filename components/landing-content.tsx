"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name: "Antonio",
        avatar: "A",
        title: "Software Engineer",
        description: "Easily one of the best application I'm currently using - Extremely Powerful!"
    },
    {
        name: "Wendy",
        avatar: "W",
        title: "Social Media Manager",
        description: "This has quickly become my favorite tool to use to produce content."
    },
    {
        name: "Brian",
        avatar: "B",
        title: "Full Stack Developer",
        description: "Completely blown away by how easy it is to brainstorm and create with this."
    },
    {
        name: "Jean",
        avatar: "J",
        title: "Data Scientist",
        description: "What a WIZARD... stunningly fast and precise."
    },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item) => (
                <Card key={item.description} className="bg-[#192339] border-none text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-x-2">
                            <div>
                                <p className="text-lg">{item.name}</p>
                                <p className="text-zinc-400 text-sm">{item.title}</p>
                            </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
        </div>
    </div>
  )
}
