'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { updateRole } from '@/api/users.api';
import { MdVpnKey, MdSearch } from 'react-icons/md';

export default function RoleSelectPage() {
  const router = useRouter();
  const { user } = useUser();

  const [selected, setSelected] =
    useState<'tenant' | 'landlord' | null>(null);

  const handleSelect = async (role: 'tenant' | 'landlord') => {
    setSelected(role);
    try {
      await updateRole(role);
      await user?.reload();
      router.push(role === 'landlord' ? '/landlord/listings' : '/');
    } catch (err) {
      console.error('Role update failed:', err);
      setSelected(null);
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-5xl">

        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold text-on-surface">
            I am a...
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-on-surface-variant">
            Select your role to customize your RoomFinder experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

          {/* LANDLORD */}
          <button
            onClick={() => handleSelect('landlord')}
            disabled={selected !== null}
            className={`group rounded-xl border bg-surface-container-lowest p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${
              selected === 'landlord'
                ? 'border-primary shadow-lg'
                : 'border-outline'
            }`}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container/20">
              <MdVpnKey size={40} className="text-primary" />
            </div>

            <h2 className="mb-2 text-2xl font-semibold text-on-surface">
              Landlord
            </h2>

            <p className="mb-6 text-on-surface-variant">
              I want to list properties, manage rentals, and find tenants.
            </p>

            <div className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white">
              {selected === 'landlord'
                ? 'Setting up...'
                : 'Continue as Landlord'}
            </div>
          </button>

          {/* TENANT */}
          <button
            onClick={() => handleSelect('tenant')}
            disabled={selected !== null}
            className={`group rounded-xl border bg-surface-container-lowest p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 ${
              selected === 'tenant'
                ? 'border-primary shadow-lg'
                : 'border-outline'
            }`}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-container/20">
              <MdSearch size={40} className="text-primary" />
            </div>

            <h2 className="mb-2 text-2xl font-semibold text-on-surface">
              Tenant
            </h2>

            <p className="mb-6 text-on-surface-variant">
              I'm looking for rooms, verified listings, and easy booking.
            </p>

            <div className="w-full rounded-lg border border-primary py-3 text-sm font-semibold text-primary transition group-hover:bg-primary/5">
              {selected === 'tenant'
                ? 'Setting up...'
                : 'Continue as Tenant'}
            </div>
          </button>

        </div>
      </div>
    </main>
  );
}