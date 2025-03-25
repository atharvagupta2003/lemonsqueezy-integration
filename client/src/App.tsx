// client/src/App.tsx
import { PlanCard } from './components/PlanCard';

function App() {
  return (
    <div style={{ padding: 40 }}>
      <PlanCard
        plan={{
          name: 'Starter Plan',
          price: 19,
          period: 'month',
          features: ['Basic features', 'Email support', '1 GB Storage'],
        }}
      />
    </div>
  );
}

export default App;
