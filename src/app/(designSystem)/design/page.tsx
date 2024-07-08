"use client"
import * as React from "react"
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye, Search, Bell, Plus, Loader } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"


import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"





const colors = [
	{ name: 'Primary', className: 'bg-primary', description: 'Titres, CTA, hovers, fonds, pictos, contours', hex: '#2D4D43' },
	{ name: 'Secondary', className: 'bg-secondary', description: 'Boutons secondaires, liens secondaires', hex: '#D2653E' },
	{ name: 'Accent', className: 'bg-accent', description: 'Éléments d\'accentuation', hex: '#E9E9E9' },
	{ name: 'Destructive', className: 'bg-destructive', description: 'Boutons ou actions destructrices', hex: '#F04747' },
	{ name: 'Background', className: 'bg-background', description: 'Couleur de fond principale', hex: '#FFFFFF' },
	{ name: 'Foreground', className: 'bg-foreground', description: 'Couleur de texte principale', hex: '#0A0B0A' },
	{ name: 'Muted', className: 'bg-muted', description: 'Éléments de fond secondaires ou désactivés', hex: '#F5F5F5' },
	{ name: 'Success', className: 'bg-success', description: 'Indicateurs de succès', hex: '#58a55b' },
	{ name: 'Warning', className: 'bg-warning', description: 'Indicateurs d\'avertissement', hex: '#ff9a1f' },
	{ name: 'Error', className: 'bg-error', description: 'Indicateurs d\'erreur', hex: '#921111' },
];

const colorVariants = [
	{
		name: 'Primary',
		variants: [
			{ name: 'Primary100', className: 'bg-primary100', hex: '#eff6f4' },
			{ name: 'Primary200', className: 'bg-primary200', hex: '#cfe3dd' },
			{ name: 'Primary300', className: 'bg-primary300', hex: '#afd0c6' },
			{ name: 'Primary400', className: 'bg-primary400', hex: '#8ebdaf' },
			{ name: 'Primary500', className: 'bg-primary500', hex: '#6ea998' },
			{ name: 'Primary600', className: 'bg-primary600', hex: '#55917e' },
			{ name: 'Primary700', className: 'bg-primary700', hex: '#427162' },
			{ name: 'Primary800', className: 'bg-primary800', hex: '#2f5046' },
			{ name: 'Primary900', className: 'bg-primary900', hex: '#1c302a' },
			{ name: 'Primary1000', className: 'bg-primary1000', hex: '#09100e' },
		]
	},
	{
		name: 'Secondary',
		variants: [
			{ name: 'Secondary100', className: 'bg-secondary100', hex: '#faefe4' },
			{ name: 'Secondary200', className: 'bg-secondary200', hex: '#f1cec1' },
			{ name: 'Secondary300', className: 'bg-secondary300', hex: '#e7ad98' },
			{ name: 'Secondary400', className: 'bg-secondary400', hex: '#dd8c6e' },
			{ name: 'Secondary500', className: 'bg-secondary500', hex: '#ba512b' },
			{ name: 'Secondary600', className: 'bg-secondary600', hex: '#913f22' },
			{ name: 'Secondary700', className: 'bg-secondary700', hex: '#672d18' },
			{ name: 'Secondary800', className: 'bg-secondary800', hex: '#3e1b0e' },
			{ name: 'Secondary900', className: 'bg-secondary900', hex: '#150905' },
			{ name: 'Secondary1000', className: 'bg-secondary1000', hex: '#0a0403' },
		]
	},
	{
		name: 'Muted',
		variants: [
			{ name: 'Muted100', className: 'bg-muted100', hex: '#f5f5f5' },
			{ name: 'Muted200', className: 'bg-muted200', hex: '#e5e5e5' },
			{ name: 'Muted300', className: 'bg-muted300', hex: '#d4d4d4' },
			{ name: 'Muted400', className: 'bg-muted400', hex: '#a3a3a3' },
			{ name: 'Muted500', className: 'bg-muted500', hex: '#737373' },
			{ name: 'Muted600', className: 'bg-muted600', hex: '#525252' },
			{ name: 'Muted700', className: 'bg-muted700', hex: '#404040' },
			{ name: 'Muted800', className: 'bg-muted800', hex: '#262626' },
			{ name: 'Muted900', className: 'bg-muted900', hex: '#171717' },
		]
	},
	{
		name: 'Success',
		variants: [
			{ name: 'Success100', className: 'bg-success100', hex: '#c7e1c8' },
			{ name: 'Success200', className: 'bg-success200', hex: '#8fc391' },
			{ name: 'Success300', className: 'bg-success300', hex: '#3e7440' },
		]
	},
	{
		name: 'Warning',
		variants: [
			{ name: 'Warning100', className: 'bg-warning100', hex: '#ffdbb4' },
			{ name: 'Warning200', className: 'bg-warning200', hex: '#ffb86a' },
			{ name: 'Warning300', className: 'bg-warning300', hex: '#c76d00' },
		]
	},
	{
		name: 'Error',
		variants: [
			{ name: 'Error100', className: 'bg-error100', hex: '#f6b1b1' },
			{ name: 'Error200', className: 'bg-error200', hex: '#ed6464' },
			{ name: 'Error300', className: 'bg-error300', hex: '#e01a1a' },
		]
	},
	{
		name: 'Background',
		variants: [
			{ name: 'Background100', className: 'bg-background100', hex: '#f5f5f5' },
			{ name: 'Background200', className: 'bg-background200', hex: '#e5e5e5' },
			{ name: 'Background300', className: 'bg-background300', hex: '#d4d4d4' },
			{ name: 'Background400', className: 'bg-background400', hex: '#a3a3a3' },
			{ name: 'Background500', className: 'bg-background500', hex: '#737373' },
			{ name: 'Background600', className: 'bg-background600', hex: '#525252' },
			{ name: 'Background700', className: 'bg-background700', hex: '#404040' },
			{ name: 'Background800', className: 'bg-background800', hex: '#262626' },
			{ name: 'Background900', className: 'bg-background900', hex: '#171717' },
		]
	},
];

function Page() {
	const [date, setDate] = React.useState<Date>()
	const [date2, setDate2] = React.useState<Date | undefined>(new Date())

	return (
		<div className="flex">
			<aside className="bg-black text-white w-48 p-4 space-y-4 sticky top-0 h-screen">
				<a href="#couleur" className="block py-2 font-bold">Couleur</a>
				<a href="#variantes" className="block py-2 font-bold">Variantes</a>
				<a href="#texte" className="block py-2 font-bold">Texte</a>
				<a href="#boutons" className="block py-2 font-bold">Boutons</a>
				<a href="#inputs" className="block py-2 font-bold">Input</a>
				<a href="#articles-images" className="block py-2 font-bold">Articles / Images</a>
				<a href="#espacements" className="block py-2 font-bold">Espacements</a>
				<a href="#typographie" className="block py-2 font-bold">Typographie</a>
			</aside>
			<main className="flex-1 p-8 space-y-16">
				<div className="text-4xl font-bold mb-8">Design System</div>

				<section className="scroll-mt-16" id="couleur">
					<Card>
						<CardHeader>
							<CardTitle className="font-heading text-5xl">Couleurs</CardTitle>
							<CardDescription>Palette de couleurs utilisées dans le design system</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-white shadow rounded-lg">
								{colors.map((color, index) => (
									<div key={index} className="flex flex-col items-center space-y-2 text-center">
										<div className={`w-16 h-16 rounded-full border ${color.className}`}></div>
										<span className="text-sm font-semibold">{color.name}</span>
										{color.description && <span className="text-xs text-gray-500">{color.description}</span>}
										<span className="text-xs font-mono">{color.hex}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</section>

				<section className="scroll-mt-16" id="variantes">
					<Card>
						<CardHeader>
							<CardTitle className="font-heading text-5xl">Variantes de Couleurs</CardTitle>
							<CardDescription>Variantes des couleurs utilisées dans le design system</CardDescription>
						</CardHeader>
						<CardContent>
							{colorVariants.map((colorGroup, index) => (
								<div key={index} className="mb-8">
									<div className="text-3xl font-semibold mb-4">{colorGroup.name}</div>
									<div className="grid grid-cols-3 gap-4">
										{colorGroup.variants.map((variant, idx) => (
											<div key={idx} className="flex flex-col items-center space-y-2 text-center">
												<div
													className={`w-24 h-24 rounded-lg border ${variant.className}`}
													style={{ backgroundColor: variant.hex }}
												></div>
												<span className="text-sm font-semibold">{variant.name}</span>
												<span className="text-xs font-mono">{variant.hex}</span>
												<span className="text-xs text-gray-500">{`.${variant.className}`}</span>
											</div>
										))}
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</section>

				<section className="scroll-mt-16" id="texte">
					<Card>
						<CardHeader>
							<CardTitle className="font-heading text-5xl">Textes</CardTitle>
							<CardDescription>Styles de texte utilisés dans le design system</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-8">
								<div className="text-5xl font-bold font-neuton mb-4">TITRE 1 - NEUTON</div>
								<div className="text-4xl font-bold font-neuton mb-4">TITRE 2 - NEUTON</div>
								<div className="text-3xl font-bold font-neuton mb-4">TITRE 3 - NEUTON</div>
								<div className="text-2xl font-bold font-neuton mb-4">TITRE 4 - NEUTON</div>
								<div className="text-xl font-bold font-neuton mb-4">TITRE 5 - NEUTON</div>
								<div className="text-base font-normal font-poppins leading-6">
									Texte courant - Poppins Regular
								</div>
							</div>
						</CardContent>
					</Card>
				</section>

				<section className="scroll-mt-16" id="boutons">
					<Card>
						<CardHeader>
							<CardTitle className="font-heading text-5xl">Buttons</CardTitle>
							<CardDescription>Exemples de boutons utilisés dans le design system</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-8">
								<div className="text-2xl font-bold mb-4">Default Buttons</div>
								<div className="flex flex-wrap gap-4">
									<Button variant="default">Découvrir</Button>
									<Button variant="default" className="blur-sm">Découvrir</Button>
									<Button variant="default" disabled>Découvrir</Button>
									<Button variant="default" className="flex items-center">
										<Eye className="mr-2 h-4 w-4" /> Découvrir
									</Button>
									<Button variant="default" className="rounded-full flex items-center p-2">
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button variant="default" className="flex items-center">
										<Plus className="mr-2 h-4 w-4" /> Ajouter
									</Button>
									<Button variant="default" className="flex items-center">
										<Search className="mr-2 h-4 w-4" /> Rechercher
									</Button>
									<Button variant="default" className="flex items-center">
										<Bell className="mr-2 h-4 w-4" /> Notifications
									</Button>
									<Button variant="default" className="flex items-center">
										<Loader className="mr-2 h-4 w-4 animate-spin" /> Loading
									</Button>
								</div>
							</div>
							<div className="mb-8">
								<div className="text-2xl font-bold mb-4">Small Buttons</div>
								<div className="flex flex-wrap gap-4">
									<Button variant="default" size="sm">Découvrir</Button>
									<Button variant="default" size="sm" disabled>Découvrir</Button>
									<Button variant="default" size="sm" className="flex items-center">
										<Eye className="mr-2 h-3 w-3" /> Découvrir
									</Button>
									<Button variant="default" size="sm" className="rounded-full flex items-center p-2">
										<ChevronLeft className="h-3 w-3" />
									</Button>
								</div>
							</div>
							<div className="mb-8">
								<div className="text-2xl font-bold mb-4">Large Buttons</div>
								<div className="flex flex-wrap gap-4">
									<Button variant="default" size="lg">Découvrir</Button>
									<Button variant="default" size="lg" disabled>Découvrir</Button>
									<Button variant="default" size="lg" className="flex items-center">
										<Eye className="mr-2 h-5 w-5" /> Découvrir
									</Button>
									<Button variant="default" size="lg" className="rounded-full flex items-center p-2">
										<ChevronLeft className="h-5 w-5" />
									</Button>
								</div>
							</div>
							<div className="mb-8">
								<div className="text-2xl font-bold mb-4">Secondary Buttons</div>
								<div className="flex flex-wrap gap-4">
									<Button variant="secondary">Découvrir</Button>
									<Button variant="secondary" className="blur-sm">Découvrir</Button>
									<Button variant="secondary" disabled>Découvrir</Button>
									<Button variant="secondary" className="flex items-center">
										<Eye className="mr-2 h-4 w-4" /> Découvrir
									</Button>
									<Button variant="secondary" className="rounded-full flex items-center p-2">
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button variant="secondary" className="flex items-center">
										<Plus className="mr-2 h-4 w-4" /> Ajouter
									</Button>
									<Button variant="secondary" className="flex items-center">
										<Search className="mr-2 h-4 w-4" /> Rechercher
									</Button>
									<Button variant="secondary" className="flex items-center">
										<Bell className="mr-2 h-4 w-4" /> Notifications
									</Button>
									<Button variant="secondary" className="flex items-center">
										<Loader className="mr-2 h-4 w-4 animate-spin" /> Loading
									</Button>
								</div>
							</div>
							<div className="mb-8">
								<div className="text-2xl font-bold mb-4">Outline Buttons</div>
								<div className="flex flex-wrap gap-4">
									<Button variant="outline">Découvrir</Button>
									<Button variant="outline" className="blur-sm">Découvrir</Button>
									<Button variant="outline" disabled>Découvrir</Button>
									<Button variant="outline" className="flex items-center">
										<Eye className="mr-2 h-4 w-4" /> Découvrir
									</Button>
									<Button variant="outline" className="rounded-full flex items-center p-2">
										<ChevronLeft className="h-4 w-4" />
									</Button>
									<Button variant="outline" className="flex items-center">
										<Plus className="mr-2 h-4 w-4" /> Ajouter
									</Button>
									<Button variant="outline" className="flex items-center">
										<Search className="mr-2 h-4 w-4" /> Rechercher
									</Button>
									<Button variant="outline" className="flex items-center">
										<Bell className="mr-2 h-4 w-4" /> Notifications
									</Button>
									<Button variant="outline" className="flex items-center">
										<Loader className="mr-2 h-4 w-4 animate-spin" /> Loading
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>


				{/* Section Inputs */}
				<section className="scroll-mt-16" id="inputs">
					<Card>
						<CardHeader>
							<CardTitle className="font-heading text-5xl">Inputs</CardTitle>
							<CardDescription>Composants d'entrée utilisés dans le design system</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-8 space-y-6">

								{/* Input Text */}
								<div className="space-y-4">
									<div className="space-y-1">
										<Label htmlFor="simple-email">Simple Email</Label>
										<Input type="email" id="simple-email" placeholder="Email" />
									</div>
									<div className="space-y-1">
										<Label htmlFor="disabled-email">Disabled Email</Label>
										<Input disabled type="email" id="disabled-email" placeholder="Email" />
									</div>
									<div className="grid w-full max-w-sm items-center gap-1.5">
										<Label htmlFor="labeled-email">Labeled Email</Label>
										<Input type="email" id="labeled-email" placeholder="Email" />
									</div>
									<div className="flex w-full max-w-sm items-center space-x-2">
										<Input type="email" placeholder="Email" />
										<Button type="submit">Subscribe</Button>
									</div>
									<div className="grid w-full max-w-sm items-center gap-1.5">
										<Label htmlFor="picture">Picture</Label>
										<Input id="picture" type="file" />
									</div>
								</div>

								{/* TextArea */}
								<div className="space-y-4">
									<div className="space-y-1">
										<Label htmlFor="textarea">Texte long</Label>
										<Textarea id="textarea" rows={4} placeholder="Entrez un texte long" className="mt-1 block w-full" />
									</div>
								</div>

								{/* Date Picker */}
								<div className="space-y-4">
									<div className="space-y-1">
										<Label htmlFor="date-picker">Date Picker</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={"outline"}
													className={cn(
														"w-[240px] justify-start text-left font-normal",
														!date && "text-muted-foreground"
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{date ? format(date, "PPP") : <span>Pick a date</span>}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={date}
													onSelect={setDate}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
									</div>

									<Calendar
										mode="single"
										selected={date2}
										onSelect={setDate2}
										className="rounded-md border shadow"
									/>
								</div>

								{/* Select */}
								<div className="space-y-4">
									<div className="space-y-1">
										<Label htmlFor="select">Sélectionner</Label>
										<Select>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select a fruit" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Fruits</SelectLabel>
													<SelectItem value="apple">Apple</SelectItem>
													<SelectItem value="banana">Banana</SelectItem>
													<SelectItem value="blueberry">Blueberry</SelectItem>
													<SelectItem value="grapes">Grapes</SelectItem>
													<SelectItem value="pineapple">Pineapple</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
								</div>

								{/* Checkbox */}
								<div className="space-y-4">
									<div className="space-y-2">
										<div className="items-top flex space-x-2">
											<Checkbox id="terms1" />
											<div className="grid gap-1.5 leading-none">
												<Label htmlFor="terms1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
													Accept terms and conditions
												</Label>
												<p className="text-sm text-muted-foreground">
													You agree to our Terms of Service and Privacy Policy.
												</p>
											</div>
										</div>
										<div className="flex items-center space-x-2">
											<Checkbox id="terms2" disabled />
											<Label htmlFor="terms2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
												Accept terms and conditions
											</Label>
										</div>
									</div>
								</div>

								{/* Radio */}
								<div className="space-y-4">
									<div className="space-y-1">
										<Label>Radio Options</Label>
										<RadioGroup defaultValue="option-one">
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="option-one" id="option-one" />
												<Label htmlFor="option-one">Option One</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="option-two" id="option-two" />
												<Label htmlFor="option-two">Option Two</Label>
											</div>
										</RadioGroup>
									</div>
								</div>

								{/* Switch */}
								<div className="space-y-4">
									<div className="space-y-1">
										<div className="flex items-center space-x-2">
											<Switch id="airplane-mode" />
											<Label htmlFor="airplane-mode">Airplane Mode</Label>
										</div>
									</div>
								</div>

								{/* InputOTP */}
								<div className="space-y-4">
									<div className="space-y-1">
										<Label>OTP Input</Label>
										<InputOTP maxLength={6}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</section>
			</main>
		</div>
	);
}

export default Page;


