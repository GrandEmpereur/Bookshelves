import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "admin",
    label: "Administratif",
  },
  {
    value: "form",
    label: "Formulaire",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "received",
    label: "Reçu",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "under_review",
    label: "En cours d'examen",
    icon: CircleIcon,
  },
  {
    value: "additional_info_requested",
    label: "Informations supplémentaires demandées",
    icon: StopwatchIcon,
  },
  {
    value: "approved",
    label: "Approuvé",
    icon: CheckCircledIcon,
  },
  {
    value: "rejected",
    label: "Rejeté",
    icon: CrossCircledIcon,
  },
  {
    value: "on_hold",
    label: "En attente",
    icon: CircleIcon,
  },
  {
    value: "completed",
    label: "Complété",
    icon: CheckCircledIcon,
  }
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
