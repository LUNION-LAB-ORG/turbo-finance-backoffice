"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DepenseList } from "./depenses"
import { CategorieDepenseList } from "./categorie-depense"


export default function DepenseTabs() {
    return (
        <div className="w-full px-4 py-6 -mt-6">
            <div className="w-full px-4 py-6 shadow-lg rounded-lg border border-gray-200">
                <Tabs defaultValue="depenses-journalieres" className="w-full">
                    <TabsList className="w-full bg-gray-100 p-1 rounded-lg dark:bg-gray-800">
                        <TabsTrigger
                            value="depenses-journalieres"
                            className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white"
                        >
                            Liste des dépenses
                        </TabsTrigger>
                        <TabsTrigger
                            value="categories-depenses"
                            className="data-[state=active]:bg-red-500 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white"
                        >
                            Liste des catégories
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="depenses-journalieres">
                        <DepenseList />
                    </TabsContent>
                    <TabsContent value="categories-depenses">
                        <CategorieDepenseList />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}