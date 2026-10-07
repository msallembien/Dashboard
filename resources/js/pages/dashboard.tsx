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

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-8">
                {/* Recherche */}
                <div className="w-full max-w-2xl">
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            placeholder="Rechercher une application..."
                            className="h-12 rounded-xl border-muted-foreground/20 bg-background pl-11 text-sm shadow-sm"
                        />
                    </div>
                </div>

                {/* Annonces */}
                <section className="mt-16 w-full">
                    {announcements.length === 0 ? (
                        <div className="text-center text-sm text-muted-foreground">
                            Aucune annonce pour le moment.
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-6">
                            {announcements.map((announcement) => (
                                <article
                                    key={announcement.id}
                                    className="w-full max-w-2xl rounded-2xl border bg-card p-7 shadow-sm"
                                >
                                    <div className="text-center">
                                        <h2 className="text-lg font-semibold tracking-tight">
                                            {announcement.title}
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                            {announcement.content}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                {/* Applications favorites */}
                <section className="mt-16 w-full">
                    <div className="mb-6 flex items-center gap-2">
                        <Star className="size-5" />
                        <h2 className="text-lg font-semibold">
                            Applications favorites
                        </h2>
                    </div>

                    {favorites.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Vous n'avez aucune application favorite.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-3">
                            {favorites.map((application) => (
                                <a
                                    key={application.id}
                                    href={application.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-muted"
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
                                            className="size-10 rounded-lg object-contain transition group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                                            {application.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                    )}

                                    <span className="text-sm font-medium">
                                        {application.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}