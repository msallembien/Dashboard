import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

type Role = {
    id: number;
    name: string;
};

type Application = {
    id: number;
    name: string;
    description: string | null;
    url: string | null;
    icon: string | null;
    category: string | null;
    roles: Role[];
};

type ApplicationsProps = {
    applications: Application[];
};

export default function ApplicationAdminIndex({
    applications,
}: ApplicationsProps) {
    const { delete: destroy, processing } = useForm();

    const deleteApplication = (id: number, name: string) => {
        if (
            !window.confirm(
                `Voulez-vous vraiment supprimer l'application "${name}" ?`,
            )
        ) {
            return;
        }

        destroy(`/admin/applications/${id}`);
    };

    return (
        <>
            <Head title="Administration - Applications" />

            <div className="mx-auto w-full max-w-6xl px-6 py-8">
                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Applications
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Gérez les applications disponibles sur la
                            plateforme.
                        </p>
                    </div>

                    <Link
                        href="/admin/applications/create"
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <Plus className="size-4" />
                        Ajouter
                    </Link>
                </div>

                {/* Liste */}
                {applications.length === 0 ? (
                    <div className="py-20 text-center text-sm text-muted-foreground">
                        Aucune application.
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/30">
                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Application
                                        </th>

                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Catégorie
                                        </th>

                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            URL
                                        </th>

                                        <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                                            Rôles
                                        </th>

                                        <th className="px-6 py-4 text-right font-medium text-muted-foreground">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {applications.map((application) => (
                                        <tr
                                            key={application.id}
                                            className="border-b last:border-0 transition hover:bg-muted/20"
                                        >
                                            {/* Application */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
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
                                                            className="size-10 rounded-xl object-contain"
                                                        />
                                                    ) : (
                                                        <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-sm font-semibold">
                                                            {application.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </div>
                                                    )}

                                                    <span className="font-medium">
                                                        {application.name}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Catégorie */}
                                            <td className="px-6 py-4">
                                                {application.category ? (
                                                    <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
                                                        {application.category}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* URL */}
                                            <td className="max-w-xs px-6 py-4">
                                                {application.url ? (
                                                    <a
                                                        href={application.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="block truncate text-muted-foreground transition hover:text-primary hover:underline"
                                                        title={application.url}
                                                    >
                                                        {application.url}
                                                    </a>
                                                ) : (
                                                    <span className="text-muted-foreground">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            {/* Rôles */}
                                            <td className="px-6 py-4">
                                                {application.roles.length ===
                                                0 ? (
                                                    <span className="text-muted-foreground">
                                                        Aucun
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {application.roles.map(
                                                            (role) => (
                                                                <span
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    className="rounded-lg border px-2 py-1 text-xs"
                                                                >
                                                                    {role.name}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-1">
                                                    <Link
                                                        href={`/admin/applications/${application.id}/edit`}
                                                        className="flex size-9 items-center justify-center rounded-lg transition hover:bg-muted"
                                                        title="Modifier"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteApplication(
                                                                application.id,
                                                                application.name,
                                                            )
                                                        }
                                                        disabled={processing}
                                                        className="flex size-9 items-center justify-center rounded-lg text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                                                        title="Supprimer"
                                                    >
                                                        <Trash2 className="size-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}