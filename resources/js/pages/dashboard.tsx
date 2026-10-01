import { Head } from '@inertiajs/react';
import { Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Application = {
    id: number;
    name: string;
    description: string | null;
    url: string;
    icon: string | null;
    category: string | null;
};

type Announcement = {
    id: number;
    title: string;
    content: string;
    published_at: string | null;
};

type HomeProps = {
    announcements: Announcement[];
    favorites: Application[];
};

export default function Home({ announcements, favorites }: HomeProps) {
    return (
        <>
            <Head title="Accueil" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Accueil
                    </h1>
                    <p className="text-muted-foreground">
                        Retrouvez vos applications et les dernières annonces.
                    </p>
                </div>

                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Recherche</h2>

                    <div className="relative max-w-xl">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

                        <Input
                            placeholder="Rechercher une application..."
                            className="pl-9"
                        />
                    </div>
                </section>

                <section className="space-y-3">
                    <h2 className="text-lg font-semibold">Annonces</h2>

                    {announcements.length === 0 ? (
                        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                            Aucune annonce pour le moment.
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {announcements.map((announcement) => (
                                <article
                                    key={announcement.id}
                                    className="rounded-lg border p-5"
                                >
                                    <h3 className="font-semibold">
                                        {announcement.title}
                                    </h3>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {announcement.content}
                                    </p>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <section className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Star className="size-5" />
                        <h2 className="text-lg font-semibold">
                            Applications favorites
                        </h2>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                            Vous n'avez aucune application favorite.
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {favorites.map((application) => (
                                <a
                                    key={application.id}
                                    href={application.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-lg border p-5 transition hover:bg-muted/50"
                                >
                                    <h3 className="font-semibold">
                                        {application.name}
                                    </h3>

                                    {application.description && (
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {application.description}
                                        </p>
                                    )}

                                    {application.category && (
                                        <span className="mt-4 inline-block text-xs text-muted-foreground">
                                            {application.category}
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}