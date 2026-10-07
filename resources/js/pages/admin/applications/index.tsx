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

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Applications
                        </h1>

                        <p className="text-muted-foreground">
                            Gérez les applications disponibles sur la plateforme.
                        </p>
                    </div>

                    <Link
                        href="/admin/applications/create"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                        <Plus className="size-4" />
                        Ajouter
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <table className="w-full text-sm">
                        <thead className="border-b bg-muted/50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">
                                    Application
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Catégorie
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    URL
                                </th>

                                <th className="px-4 py-3 text-left font-medium">
                                    Rôles
                                </th>

                                <th className="px-4 py-3 text-right font-medium">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {applications.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-4 py-8 text-center text-muted-foreground"
                                    >
                                        Aucune application.
                                    </td>
                                </tr>
                            ) : (
                                applications.map((application) => (
                                    <tr
                                        key={application.id}
                                        className="border-b last:border-0"
                                    >
                                        <td className="px-4 py-4">
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
                                                        className="size-8 rounded object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex size-8 items-center justify-center rounded border text-xs font-semibold">
                                                        {application.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <div className="font-medium">
                                                        {application.name}
                                                    </div>

                                                    {application.description && (
                                                        <div className="max-w-md truncate text-xs text-muted-foreground">
                                                            {application.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-muted-foreground">
                                            {application.category ?? '—'}
                                        </td>

                                        <td className="px-4 py-4">
                                            {application.url ? (
                                                <a
                                                    href={application.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="max-w-xs truncate text-primary hover:underline"
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

                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {application.roles.length === 0 ? (
                                                    <span className="text-muted-foreground">
                                                        Aucun
                                                    </span>
                                                ) : (
                                                    application.roles.map(
                                                        (role) => (
                                                            <span
                                                                key={role.id}
                                                                className="rounded-md border px-2 py-1 text-xs"
                                                            >
                                                                {role.name}
                                                            </span>
                                                        ),
                                                    )
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/applications/${application.id}/edit`}
                                                    className="rounded-md p-2 transition hover:bg-muted"
                                                    title="Modifier"
                                                >
                                                    <Pencil className="size-4" />
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteApplication(application.id, application.name)
                                                    }
                                                    disabled={processing}
                                                    className="rounded-md p-2 text-destructive transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}