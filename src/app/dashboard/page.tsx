import { redirect } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/server'

export default async function DashboardHome() {

  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/')
  }
    return (
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p>Welcome to your dashboard {data.user.email}!</p>
      </div>
    );
  }
  