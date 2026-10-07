import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    ImagePlus,
} from 'lucide-react';
import { useEffect, useState } from 'react';

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
    color: string | null;
    category: string | null;
    is_internal: boolean;
    is_active: boolean;
    roles: Role[];
};

type EditApplicationProps = {
    application: Application;
    roles: Role[];
    categories: string[];
};

type ApplicationForm = {
    name: string;
    description: string;
    url: string;
    icon: File | null;
    color: string;
    category: string;
    is_internal: boolean;
    is_active: boolean;
    roles: number[];
};

const colors = [
    '#5865F2',
    '#3B82F6',
    '#06B6D4',
    '#10B981',
    '#22C55E',
    '#84CC16',
    '#EAB308',
    '#F97316',
    '#EF4444',
    '#EC4899',
    '#A855F7',
    '#6366F1',
    '#64748B',
];

export default function EditApplication({
    application,
    roles,
    categories,
}: EditApplicationProps) {
    const [newCategory, setNewCategory] = useState(false);

    const [iconPreview, setIconPreview] = useState<string | null>(
        application.icon
            ? `/storage/${application.icon}`
            : null,
    );

    const { data, setData, put, processing, errors } =
        useForm<ApplicationForm>({
            name: application.name,
            description: application.description ?? '',
            url: application.url ?? '',
            icon: null,
            color: application.color ?? '#5865F2',
            category: application.category ?? '',
            is_internal: application.is_internal,
            is_active: application.is_active,
            roles: application.roles.map((role) => role.id),
        });

    useEffect(() => {
        if (!data.icon) {
            return;
        }

        const url = URL.createObjectURL(data.icon);
        setIconPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [data.icon]);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        put(`/admin/applications/${application.id}`, {
            forceFormData: true,
        });
    };

    const toggleRole = (roleId: number) => {
        setData(
            'roles',
            data.roles.includes(roleId)
                ? data.roles.filter((id) => id !== roleId)
                : [...data.roles, roleId],
        );
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = event.target.value;

        if (value === '__new__') {
            setNewCategory(true);
            setData('category', '');
            return;
        }

        setNewCategory(false);
        setData('category', value);
    };

    return (
        <>
            <Head title={`Modifier ${application.name}`} />

            <div className="mx-auto w-full max-w-4xl px-6 py-8">
                {/* Header */}
                <div className="mb-10 flex items-start gap-4">
                    <Link
                        href="/admin/applications"
                        className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl border bg-background transition hover:bg-muted"
                    >
                        <ArrowLeft className="size-4" />
                    </Link>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Administration / Applications
                        </p>

                        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                            Modifier l'application
                        </h1>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Modifiez les informations et les accès de{' '}
                            <span className="font-medium text-foreground">
                                {application.name}
                            </span>
                            .
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-8">
                    {/* Informations générales */}
                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Informations générales
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Les informations principales de l'application.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-background p-6 shadow-sm">
                            <div className="grid gap-8 md:grid-cols-[1fr_180px]">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium"
                                        >
                                            Nom
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(event) =>
                                                setData(
                                                    'name',
                                                    event.target.value,
                                                )
                                            }
                                            className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        />

                                        {errors.name && (
                                            <p className="text-sm text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label
                                            htmlFor="description"
                                            className="text-sm font-medium"
                                        >
                                            Description
                                        </label>

                                        <textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(event) =>
                                                setData(
                                                    'description',
                                                    event.target.value,
                                                )
                                            }
                                            rows={5}
                                            className="w-full resize-none rounded-xl border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>
                                </div>

                                {/* Icône */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="icon"
                                        className="text-sm font-medium"
                                    >
                                        Icône
                                    </label>

                                    <label
                                        htmlFor="icon"
                                        className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition hover:border-primary hover:bg-muted/40"
                                    >
                                        {iconPreview ? (
                                            <img
                                                src={iconPreview}
                                                alt=""
                                                className="size-24 rounded-2xl object-contain transition group-hover:scale-105"
                                            />
                                        ) : (
                                            <>
                                                <ImagePlus className="size-9 text-muted-foreground transition group-hover:text-primary" />

                                                <span className="mt-3 text-sm font-medium">
                                                    Choisir une icône
                                                </span>

                                                <span className="mt-1 text-xs text-muted-foreground">
                                                    PNG, JPG, SVG...
                                                </span>
                                            </>
                                        )}

                                        <input
                                            id="icon"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(event) =>
                                                setData(
                                                    'icon',
                                                    event.target.files?.[0] ??
                                                        null,
                                                )
                                            }
                                        />
                                    </label>

                                    {data.icon && (
                                        <p className="truncate text-center text-xs text-muted-foreground">
                                            {data.icon.name}
                                        </p>
                                    )}

                                    {errors.icon && (
                                        <p className="text-sm text-destructive">
                                            {errors.icon}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 grid gap-6 md:grid-cols-2">
                                {/* URL */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="url"
                                        className="text-sm font-medium"
                                    >
                                        URL
                                    </label>

                                    <input
                                        id="url"
                                        type="url"
                                        value={data.url}
                                        onChange={(event) =>
                                            setData(
                                                'url',
                                                event.target.value,
                                            )
                                        }
                                        className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>

                                {/* Catégorie */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="category"
                                        className="text-sm font-medium"
                                    >
                                        Catégorie
                                    </label>

                                    {!newCategory ? (
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={handleCategoryChange}
                                            className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        >
                                            <option value="">
                                                Aucune catégorie
                                            </option>

                                            {categories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))}

                                            <option value="__new__">
                                                + Nouvelle catégorie
                                            </option>
                                        </select>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={data.category}
                                                onChange={(event) =>
                                                    setData(
                                                        'category',
                                                        event.target.value,
                                                    )
                                                }
                                                autoFocus
                                                placeholder="Nouvelle catégorie"
                                                className="h-11 min-w-0 flex-1 rounded-xl border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNewCategory(false);
                                                    setData('category', '');
                                                }}
                                                className="rounded-xl border px-3 text-sm transition hover:bg-muted"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Apparence */}
                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Apparence
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Choisissez la couleur de l'application.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-background p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={data.color}
                                    onChange={(event) =>
                                        setData(
                                            'color',
                                            event.target.value,
                                        )
                                    }
                                    className="size-12 cursor-pointer rounded-xl border bg-background p-1"
                                />

                                <div>
                                    <p className="text-sm font-medium">
                                        Couleur personnalisée
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {data.color.toUpperCase()}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <p className="mb-3 text-sm font-medium">
                                    Couleurs rapides
                                </p>

                                <div className="flex flex-wrap gap-3">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() =>
                                                setData('color', color)
                                            }
                                            className="flex size-9 items-center justify-center rounded-full border-2 border-transparent transition hover:scale-110"
                                            style={{
                                                backgroundColor: color,
                                            }}
                                            title={color}
                                        >
                                            {data.color.toLowerCase() ===
                                                color.toLowerCase() && (
                                                <Check className="size-4 text-white" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Paramètres */}
                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Paramètres
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Configurez le comportement de l'application.
                            </p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border bg-background p-5 shadow-sm transition hover:bg-muted/30">
                                <input
                                    type="checkbox"
                                    checked={data.is_internal}
                                    onChange={(event) =>
                                        setData(
                                            'is_internal',
                                            event.target.checked,
                                        )
                                    }
                                    className="mt-0.5 size-4 accent-primary"
                                />

                                <div>
                                    <p className="text-sm font-medium">
                                        Application interne
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        Cette application est destinée à un
                                        usage interne.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border bg-background p-5 shadow-sm transition hover:bg-muted/30">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(event) =>
                                        setData(
                                            'is_active',
                                            event.target.checked,
                                        )
                                    }
                                    className="mt-0.5 size-4 accent-primary"
                                />

                                <div>
                                    <p className="text-sm font-medium">
                                        Application active
                                    </p>

                                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                        L'application est disponible pour les
                                        utilisateurs autorisés.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Accès */}
                    <section className="space-y-5">
                        <div>
                            <h2 className="text-lg font-semibold">
                                Accès
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Sélectionnez les rôles autorisés à utiliser
                                cette application.
                            </p>
                        </div>

                        <div className="rounded-2xl border bg-background p-6 shadow-sm">
                            {roles.length === 0 ? (
                                <div className="rounded-xl border border-dashed p-6 text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Aucun rôle n'est disponible.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {roles.map((role) => {
                                        const selected =
                                            data.roles.includes(role.id);

                                        return (
                                            <button
                                                key={role.id}
                                                type="button"
                                                onClick={() =>
                                                    toggleRole(role.id)
                                                }
                                                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                                                    selected
                                                        ? 'border-primary bg-primary/5'
                                                        : 'hover:bg-muted/50'
                                                }`}
                                            >
                                                <div
                                                    className={`flex size-5 items-center justify-center rounded-md border ${
                                                        selected
                                                            ? 'border-primary bg-primary text-primary-foreground'
                                                            : ''
                                                    }`}
                                                >
                                                    {selected && (
                                                        <Check className="size-3.5" />
                                                    )}
                                                </div>

                                                <span className="text-sm font-medium">
                                                    {role.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t pt-6">
                        <Link
                            href="/admin/applications"
                            className="inline-flex h-10 items-center rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
                        >
                            Annuler
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Check className="size-4" />

                            {processing
                                ? 'Enregistrement...'
                                : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}