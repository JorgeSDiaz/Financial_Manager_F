import { Card } from '../components/ui';

export function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <p className="text-text-secondary text-sm">Balance Total</p>
          <p className="text-2xl font-bold text-primary">$0.00</p>
        </Card>
        <Card>
          <p className="text-text-secondary text-sm">Ingresos del Mes</p>
          <p className="text-2xl font-bold text-success">$0.00</p>
        </Card>
        <Card>
          <p className="text-text-secondary text-sm">Gastos del Mes</p>
          <p className="text-2xl font-bold text-danger">$0.00</p>
        </Card>
      </div>
    </div>
  );
}
