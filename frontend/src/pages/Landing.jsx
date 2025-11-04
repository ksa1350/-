import { ArrowRightIcon, SparklesIcon, Squares2X2Icon, SwatchIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import FeatureCard from '../components/FeatureCard.jsx';

const features = [
  {
    title: 'Visual menu designer',
    description:
      'Craft menus with intuitive drag-and-drop sections, add dishes, and fine-tune layouts without touching code.',
    icon: SwatchIcon,
  },
  {
    title: 'Collaboration ready',
    description:
      'Invite team members to co-create menus, manage availability, and synchronize updates instantly.',
    icon: Squares2X2Icon,
  },
  {
    title: 'Publish anywhere',
    description:
      'Export responsive menus to your website, print-ready PDFs, or interactive QR-code experiences.',
    icon: SparklesIcon,
  },
];

const LandingPage = () => (
  <div className="space-y-20">
    <section className="grid items-center gap-12 lg:grid-cols-2">
      <div className="space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-300">
          Build stunning menus in minutes
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Menu design that matches your culinary vision.
        </h1>
        <p className="text-lg text-slate-300">
          Menu Builder empowers restaurateurs, cafes, and caterers to craft delightful menu experiences with real-time collaboration, smart templates, and effortless publishing tools.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button as={Link} to="/auth">
            Start for free
          </Button>
          <Button variant="secondary" as={Link} to="/dashboard">
            View dashboard
          </Button>
        </div>
        <p className="text-sm text-slate-400">
          No credit card required. Cancel anytime.
        </p>
      </div>
      <div className="relative">
        <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-brand-500/10 blur-3xl" aria-hidden="true" />
        <div className="card relative overflow-hidden border-brand-500/20 bg-gradient-to-br from-white/10 to-white/5">
          <div className="space-y-6">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="font-semibold text-white">Brunch Menu</span>
              <span>Updated 2 mins ago</span>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((section) => (
                <div key={section} className="space-y-3 rounded-xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Signature Dish {section}</span>
                    <span className="text-sm text-brand-200">$18.{section}0</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    House-made recipe with seasonal ingredients sourced locally.
                  </p>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200"
            >
              Explore templates
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-10">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-white">Everything you need to launch</h2>
        <p className="mx-auto max-w-2xl text-sm text-slate-300">
          Streamline menu management, collaborate with your team, and deliver delightful dining experiences with one unified workspace.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  </div>
);

export default LandingPage;
