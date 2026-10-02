import { Head } from '@inertiajs/react';
import { Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';

type Application = {
    id: number;
    name: string;
    description: string | null;
    url: string;
    icon: string | null;
    category: string | null;
    internal: boolean;
    active: boolean;
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
            [
                application.name,
                application.description,
                application.category,
            ]
                .filter(Boolean)
                .some((field) => field!.toLowerCase().includes(value)),
        );
    }, [applications, search]);

    return (
        <>
            <Head title="Applications" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Applications
                    </h1>

                    <p className="text-muted-foreground">
                        Retrouvez les applications auxquelles vous avez accès.
                    </p>
                </div>

                <div className="relative max-w-xl">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                    <Input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Rechercher une application..."
                        className="pl-9"
                    />
                </div>

                {filteredApplications.length === 0 ? (
                    <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
                        {search
                            ? 'Aucune application ne correspond à votre recherche.'
                            : 'Aucune application disponible.'}
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredApplications.map((application) => {
                            const isFavorite =
                                application.favorites.length > 0;

                            return (
                                <a
                                    key={application.id}
                                    href={application.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative rounded-xl border p-5 transition hover:bg-muted/50"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            {application.icon ? (
                                                <img
                                                    src={application.icon}
                                                    alt=""
                                                    className="size-10 rounded-lg object-contain"
                                                />
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded-lg border text-sm font-semibold">
                                                    {application.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                            )}

                                            <div>
                                                <h2 className="font-semibold">
                                                    {application.name}
                                                </h2>

                                                {application.category && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {application.category}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <Star
                                            className={
                                                isFavorite
                                                    ? 'size-5 fill-current'
                                                    : 'text-muted-foreground size-5'
                                            }
                                        />
                                    </div>

                                    {application.description && (
                                        <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">
                                            {application.description}
                                        </p>
                                    )}
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}