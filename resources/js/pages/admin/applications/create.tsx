import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    ImagePlus,
    Plus,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type Role = {
    id: number;
    name: string;
};

type CreateApplicationProps = {
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

export default function CreateApplication({
    roles,
    categories,
}: CreateApplicationProps) {
    const [newCategory, setNewCategory] = useState(false);
    const [iconPreview, setIconPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } =
        useForm<ApplicationForm>({
            name: '',
            description: '',
            url: '',
            icon: null,
            color: '#5865F2',
            category: '',
            is_internal: false,
            is_active: true,
            roles: [],
        });

    useEffect(() => {
        if (!data.icon) {
            setIconPreview(null);
            return;
        }

        const url = URL.createObjectURL(data.icon);
        setIconPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [data.icon]);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        post('/admin/applications', {
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
            <Head title="Ajouter une application" />

            <div className="mx-auto max-w-4xl space-y-8">
                <div className="flex items-start gap-4">
                    <Link
                        href="/admin/applications"
                        className="mt-1 flex size-9 items-center justify-center rounded-lg border bg-background transition hover:bg-muted"
                    >
                        <ArrowLeft className="size-4" />
                    </Link>

                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Administration
                        </p>

                        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                            Ajouter une application
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Ajoutez une application et définissez les utilisateurs
                            qui pourront y accéder.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Informations */}
                    <section className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <h2 className="font-semibold">
                                Informations générales
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Les informations principales de l'application.
                            </p>
                        </div>

                        <div className="space-y-6 p-6">
                            <div className="grid gap-6 md:grid-cols-[1fr_180px]">
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium"
                                        >
                                            Nom
                                            <span className="ml-1 text-destructive">
                                                *
                                            </span>
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
                                            placeholder="Ex. Microsoft Teams"
                                            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
                                            rows={4}
                                            placeholder="Description de l'application..."
                                            className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        />

                                        {errors.description && (
                                            <p className="text-sm text-destructive">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Icône */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        Icône
                                    </label>

                                    <label
                                        htmlFor="icon"
                                        className="group flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition hover:border-primary hover:bg-muted/50"
                                    >
                                        {iconPreview ? (
                                            <img
                                                src={iconPreview}
                                                alt="Aperçu"
                                                className="size-24 rounded-xl object-contain"
                                            />
                                        ) : (
                                            <>
                                                <ImagePlus className="size-9 text-muted-foreground transition group-hover:text-primary" />

                                                <span className="mt-3 text-sm font-medium">
                                                    Choisir une icône
                                                </span>

                                                <span className="mt-1 text-center text-xs text-muted-foreground">
                                                    PNG, JPG, SVG...
                                                </span>
                                            </>
                                        )}

                                        <input
                                            id="icon"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(event) => {
                                                setData(
                                                    'icon',
                                                    event.target.files?.[0] ??
                                                        null,
                                                );
                                            }}
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

                            {/* URL + catégorie */}
                            <div className="grid gap-6 md:grid-cols-2">
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
                                        placeholder="https://..."
                                        className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                    />

                                    {errors.url && (
                                        <p className="text-sm text-destructive">
                                            {errors.url}
                                        </p>
                                    )}
                                </div>

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
                                            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        >
                                            <option value="">
                                                Choisir une catégorie
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
                                                placeholder="Nom de la nouvelle catégorie"
                                                autoFocus
                                                className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNewCategory(false);
                                                    setData('category', '');
                                                }}
                                                className="rounded-lg border px-3 text-sm hover:bg-muted"
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    )}

                                    {errors.category && (
                                        <p className="text-sm text-destructive">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Couleur */}
                    <section className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <h2 className="font-semibold">
                                Apparence
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Choisissez la couleur qui sera utilisée pour
                                la carte de l'application.
                            </p>
                        </div>

                        <div className="space-y-5 p-6">
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
                                    className="size-12 cursor-pointer rounded-lg border bg-background p-1"
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

                            <div>
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

                            {/* Aperçu */}
                            <div>
                                <p className="mb-3 text-sm font-medium">
                                    Aperçu
                                </p>

                                <div
                                    className="flex w-48 flex-col items-center justify-center rounded-2xl p-6 shadow-sm"
                                    style={{
                                        backgroundColor: data.color,
                                    }}
                                >
                                    {iconPreview ? (
                                        <img
                                            src={iconPreview}
                                            alt=""
                                            className="size-14 rounded-xl object-contain"
                                        />
                                    ) : (
                                        <div className="flex size-14 items-center justify-center rounded-xl bg-white/20 text-xl font-semibold text-white">
                                            {data.name
                                                ? data.name
                                                      .charAt(0)
                                                      .toUpperCase()
                                                : 'A'}
                                        </div>
                                    )}

                                    <span className="mt-3 max-w-full truncate text-sm font-semibold text-white">
                                        {data.name || 'Application'}
                                    </span>
                                </div>
                            </div>

                            {errors.color && (
                                <p className="text-sm text-destructive">
                                    {errors.color}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Paramètres */}
                    <section className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <h2 className="font-semibold">
                                Paramètres
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Configurez le comportement de l'application.
                            </p>
                        </div>

                        <div className="grid gap-4 p-6 md:grid-cols-2">
                            <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:bg-muted/50">
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

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Cette application est destinée à un
                                        usage interne.
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition hover:bg-muted/50">
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

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        L'application sera disponible pour les
                                        utilisateurs autorisés.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Rôles */}
                    <section className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b px-6 py-5">
                            <h2 className="font-semibold">
                                Accès
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Sélectionnez les rôles autorisés à utiliser
                                cette application.
                            </p>
                        </div>

                        <div className="p-6">
                            {roles.length === 0 ? (
                                <div className="rounded-lg border border-dashed p-6 text-center">
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
                                                className={`flex items-center gap-3 rounded-lg border p-4 text-left transition ${
                                                    selected
                                                        ? 'border-primary bg-primary/5'
                                                        : 'hover:bg-muted/50'
                                                }`}
                                            >
                                                <div
                                                    className={`flex size-5 items-center justify-center rounded border ${
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

                            {errors.roles && (
                                <p className="mt-3 text-sm text-destructive">
                                    {errors.roles}
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t pt-6">
                        <p className="text-sm text-muted-foreground">
                            Les champs marqués d'un * sont obligatoires.
                        </p>

                        <div className="flex gap-3">
                            <Link
                                href="/admin/applications"
                                className="inline-flex items-center rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                            >
                                Annuler
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Plus className="size-4" />

                                {processing
                                    ? 'Création...'
                                    : "Créer l’application"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}