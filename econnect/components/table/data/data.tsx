import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "actief",
    label: "Actief",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "nietActief",
    label: "Niet actief",
    icon: CircleIcon,
  },
];

export const taskTypes = [
  {
    value: "Beoordelen upload opdracht",
    label: "Beoordelen upload opdracht",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Beoordelen digitaal examen",
    label: "Beoordelen digitaal examen",
    icon: CircleIcon,
  },
];

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
];
