import { Head } from '@inertiajs/react';
import { Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

type Application = {
    id: number;
    name: string;
    description: string | null;
    url: string | null;
    icon: string | null;
    color: string | null;
    category: string | null;
    is_internal: boolean;
    is_active: boolean;
    favorites: {
        id: number;
        user_id: number;
        application_id: number;
    }[];
};

type ApplicationsProps = {
    applications: Application[];
};

export default function Applications({
    applications,
}: ApplicationsProps) {
    const [search, setSearch] = useState('');

    const filteredApplications = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) {
            return applications;
        }

        return applications.filter((application) =>
            [application.name, application.category]
                .filter(Boolean)
                .some((field) =>
                    field!.toLowerCase().includes(value),
                ),
        );
    }, [applications, search]);

    return (
        <>
            <Head title="Applications" />

            <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-8">
                {/* Recherche */}
                <div className="w-full max-w-2xl">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Rechercher une application..."
                            className="h-12 rounded-xl border-muted-foreground/20 bg-background pl-11 shadow-sm"
                        />
                    </div>
                </div>

                {/* Applications */}
                <div className="mt-14 w-full">
                    {filteredApplications.length === 0 ? (
                        <div className="py-16 text-center text-sm text-muted-foreground">
                            {search
                                ? 'Aucune application ne correspond à votre recherche.'
                                : 'Aucune application disponible.'}
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-5">
                            {filteredApplications.map((application) => {
                                const isFavorite =
                                    application.favorites.length > 0;

                                const backgroundColor =
                                    application.color || '#64748B';

                                return (
                                    <a
                                        key={application.id}
                                        href={application.url ?? '#'}
                                        target={
                                            application.url
                                                ? '_blank'
                                                : undefined
                                        }
                                        rel={
                                            application.url
                                                ? 'noreferrer'
                                                : undefined
                                        }
                                        className="group relative flex w-36 flex-col items-center rounded-2xl p-4 transition duration-200 hover:-translate-y-1 hover:bg-muted/50"
                                    >
                                        {/* Application */}
                                        <div
                                            className="relative flex size-24 items-center justify-center overflow-hidden rounded-2xl shadow-sm transition duration-200 group-hover:shadow-md"
                                            style={{
                                                backgroundColor,
                                            }}
                                        >
                                            {application.icon ? (
                                                <img
                                                    src={
                                                        application.icon.startsWith(
                                                            '/storage/',
                                                        )
                                                            ? application.icon
                                                            : `/storage/${application.icon}`
                                                    }
                                                    alt=""
                                                    className="size-14 rounded-xl object-contain drop-shadow-md transition duration-200 group-hover:scale-110"
                                                />
                                            ) : (
                                                <span className="text-3xl font-bold text-white">
                                                    {application.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}

                                            {/* Favori */}
                                            <div className="absolute top-2 right-2">
                                                <Star
                                                    className={
                                                        isFavorite
                                                            ? 'size-4 fill-white text-white'
                                                            : 'size-4 text-white/70 opacity-0 transition group-hover:opacity-100'
                                                    }
                                                />
                                            </div>
                                        </div>

                                        {/* Nom */}
                                        <span className="mt-3 w-full truncate text-center text-sm font-medium">
                                            {application.name}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}