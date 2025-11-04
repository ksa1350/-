import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import MenuCard from '../components/MenuCard.jsx';
import InputField from '../components/InputField.jsx';
import { createMenuRequest, fetchMenus } from '../lib/apiClient.js';

const DashboardPage = () => {
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    let isMounted = true;
    fetchMenus()
      .then((data) => {
        if (isMounted) {
          setMenus(data);
        }
      })
      .catch((error) => {
        console.error('Failed to load menus', error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmit = async (values) => {
    try {
      const created = await createMenuRequest(values);
      setMenus((prev) => [created, ...prev]);
      reset();
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create menu', error);
      // eslint-disable-next-line no-alert
      alert(error?.response?.data?.message ?? 'Unable to create menu');
    }
  };

  const hasMenus = useMemo(() => menus.length > 0, [menus]);

  return (
    <div className="space-y-10">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Manage your menus, publish updates, and collaborate with your team.
          </p>
        </div>
        <Button onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Close' : 'New menu'}
        </Button>
      </header>

      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Menu title"
              placeholder="Summer tasting"
              error={errors?.title?.message}
              {...register('title', { required: 'Please provide a menu title' })}
            />
            <InputField
              label="Description"
              placeholder="A seasonal celebration of local produce"
              error={errors?.description?.message}
              {...register('description')}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating…' : 'Create menu'}
            </Button>
          </div>
        </form>
      ) : null}

      {isLoading ? (
        <div className="card text-center text-sm text-slate-400">Loading menus…</div>
      ) : hasMenus ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {menus.map((menu) => (
            <MenuCard key={menu.id} {...menu} />
          ))}
        </div>
      ) : (
        <EmptyState onCreate={() => setShowForm(true)} />
      )}
    </div>
  );
};

export default DashboardPage;
