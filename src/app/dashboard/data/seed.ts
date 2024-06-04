import fs from "fs"
import path from "path"
import { faker } from "@faker-js/faker"

import { labels, priorities, statuses } from "./data"

export const seeder = () => {
  const tasks = Array.from({ length: 100 }, () => ({
    id: `RPT-${faker.number.int({ min: 1000, max: 9999 })}`,
    email: faker.internet.email(),
    status: faker.helpers.arrayElement(statuses).value,
    label: faker.helpers.arrayElement(labels).value,
    priority: faker.helpers.arrayElement(priorities).value,
  }))

  const filePath = path.join(process.cwd(), "src/app/dashboard/data/tasks.json");
  const fileContent = JSON.stringify(tasks, null, 2);

  fs.writeFileSync(filePath, fileContent);

}

// N'oubliez pas d'appeler la fonction seeder quelque part dans votre code.
// seeder();


