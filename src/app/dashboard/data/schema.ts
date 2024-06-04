import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  email: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export const HorairesDeTravailSchema = z.object({
  heuresSupplementaires: z.string(),
  heuresTravailSemaine: z.string(),
  horairesIrreguliers: z.string(),
  moyenDeTransport: z.string(),
  tempsTrajet: z.string(),
})

export const EffortMentalSchema = z.object({
  fatigueMentaleOuStress: z.string(),
  forteConcentrationRequise: z.string(),
  impactNegatifSurViePersonnelle: z.string(),
})

export const EffortPhysiqueSchema = z.object({
  deplacementsFrequents: z.string(),
  expositionRisquesPhysiques: z.string(),
  positionStatique: z.string(),
  problemesPhysiquesLiesAuTravail: z.string(),
  travailRepetitif: z.string(),
})

export const EnvironnementSchema = z.object({
  espaceDeTravailInadapte: z.string(),
  expositionProduitsToxiques: z.string(),
  expositionVibrations: z.string(),
})

export const SatisfactionSchema = z.object({
  motivationPourTachesQuotidiennes: z.string(),
  optionsReconversion: z.string(),
  possibiliteEvolutionCarriere: z.string(),
  satisfactionTravail: z.string(),
})

export type Task = z.infer<typeof taskSchema>
export type EffortMentalSchema = z.infer<typeof EffortMentalSchema>
export type EffortPhysiqueSchema = z.infer<typeof EffortPhysiqueSchema>
export type EnvironnementSchema = z.infer<typeof EnvironnementSchema>
export type SatisfactionSchema = z.infer<typeof SatisfactionSchema>
export type HorairesDeTravailSchema = z.infer<typeof HorairesDeTravailSchema>