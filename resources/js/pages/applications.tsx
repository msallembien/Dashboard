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

            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Applications
                    </h1>

                    <p className="mt-1 text-muted-foreground">
                        Retrouvez les applications auxquelles vous avez accès.
                    </p>
                </div>

                {/* Recherche */}
                <div className="relative max-w-xl">
                    <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Rechercher une application..."
                        className="h-11 pl-9"
                    />
                </div>

                {/* Applications */}
                {filteredApplications.length === 0 ? (
                    <div className="rounded-xl border p-10 text-center text-sm text-muted-foreground">
                        {search
                            ? 'Aucune application ne correspond à votre recherche.'
                            : 'Aucune application disponible.'}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
                                    className="group relative aspect-square overflow-hidden rounded-2xl p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                                    style={{
                                        backgroundColor,
                                    }}
                                >
                                    {/* Favori */}
                                    <div className="absolute top-3 right-3">
                                        <Star
                                            className={
                                                isFavorite
                                                    ? 'size-5 fill-white text-white'
                                                    : 'size-5 text-white/60 opacity-0 transition group-hover:opacity-100'
                                            }
                                        />
                                    </div>

                                    {/* Contenu */}
                                    <div className="flex h-full flex-col items-center justify-center">
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
                                                className="size-16 rounded-2xl object-contain drop-shadow-md transition duration-200 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex size-16 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold text-white shadow-sm">
                                                {application.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                        )}

                                        <h2 className="mt-4 max-w-full truncate text-center text-sm font-semibold text-white">
                                            {application.name}
                                        </h2>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}