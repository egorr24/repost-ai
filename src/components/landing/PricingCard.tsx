import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  buttonText: string
  buttonVariant?: "default" | "secondary" | "outline"
}

export function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  buttonText,
  buttonVariant = "outline",
}: PricingCardProps) {
  return (
    <Card className={`relative flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10 ${
      isPopular ? "border-violet-500/50 bg-violet-500/5 shadow-xl shadow-violet-500/10" : ""
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Best Deal
          </span>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
          {price}
          {price !== "$0" && price !== "$249" && <span className="ml-1 text-xl font-medium text-neutral-400">/мес</span>}
        </div>
        <CardDescription className="mt-2 text-neutral-400">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <ul className="space-y-3 mt-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-violet-400" />
              </div>
              <p className="ml-3 text-sm text-neutral-300">{feature}</p>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant={buttonVariant} 
          className="w-full"
          size="lg"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
