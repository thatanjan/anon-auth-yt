import { createClientForServer } from '@/utils/supabase/server'
import {
  loginWithPassword,
  logout,
  signinAnonymously,
  updateUser,
} from './actions'

export default async function Home() {
  const supabase = await createClientForServer()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error)
  } else {
    console.log('User data:', user)
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 gap-12 bg-white dark:bg-black'>
      <h1 className='text-2xl font-bold mb-4'>
        {user ? (
          <>
            Logged in as {user?.is_anonymous ? 'Anonymous User' : user?.email}
          </>
        ) : (
          'Not Logged in'
        )}
      </h1>
      <form className='flex gap-4 mb-4'>
        <button
          className='bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition'
          formAction={signinAnonymously}
        >
          Login Anonymously
        </button>
        <button
          className='bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition'
          formAction={logout}
        >
          Logout
        </button>
      </form>
      <div className='flex flex-col sm:flex-row gap-12 w-full max-w-2xl justify-center'>
        {/* Update User Form */}
        <form
          className='flex flex-col gap-4 border rounded-lg p-6 shadow w-full sm:w-96 bg-gray-50 dark:bg-neutral-900'
          action={updateUser}
        >
          <h2 className='text-lg font-semibold mb-2'>Update User</h2>
          <label className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>Email</span>
            <input
              type='email'
              name='email'
              className='border rounded px-3 py-2 bg-white dark:bg-neutral-800'
              required
              autoComplete='off'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>Password</span>
            <input
              type='password'
              name='password'
              className='border rounded px-3 py-2 bg-white dark:bg-neutral-800'
              required
              autoComplete='off'
            />
          </label>
          <button
            type='submit'
            className='mt-2 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition'
          >
            Update
          </button>
        </form>

        {/* Login Form */}
        <form
          className='flex flex-col gap-4 border rounded-lg p-6 shadow w-full sm:w-96 bg-gray-50 dark:bg-neutral-900'
          action={loginWithPassword}
        >
          <h2 className='text-lg font-semibold mb-2'>Login</h2>
          <label className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>Email</span>
            <input
              type='email'
              name='email'
              className='border rounded px-3 py-2 bg-white dark:bg-neutral-800'
              required
              autoComplete='off'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='text-sm font-medium'>Password</span>
            <input
              type='password'
              name='password'
              className='border rounded px-3 py-2 bg-white dark:bg-neutral-800'
              required
              autoComplete='off'
            />
          </label>
          <button
            type='submit'
            className='mt-2 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700 transition'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
