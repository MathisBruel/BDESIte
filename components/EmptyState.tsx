interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
}

export function EmptyState({ title, description, icon = "🔍" }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold font-spartan text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}

