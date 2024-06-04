import { promises as fs } from "fs"
import path from "path"
import { z } from "zod"

import { taskSchema } from "./data/schema"
import { seeder } from "./data/seed"
import CalendarDate from "./components/CalendarDate"

async function getTasks() {
    const filePath = path.join(process.cwd(), "src/app/dashboard/data/tasks.json");

    try {
        await fs.access(filePath);
    } catch (error) {
        await seeder();
    }

    // Lire le fichier (nouvellement créé ou existant)
    const data = await fs.readFile(filePath);
    const tasks = JSON.parse(data.toString());

    return z.array(taskSchema).parse(tasks);
}

const Dashboard = async () => {
    const tasks = await getTasks()

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex-1 space-y-4 p-8 pt-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                            <div className="flex items-center space-x-2">
                            <CalendarDate />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
