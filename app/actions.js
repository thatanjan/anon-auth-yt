'use server'
import { createClientForServer } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

const signinAnonymously = async () => {
  console.log('Signing in anonymously...')
  const supabase = await createClientForServer()

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    console.error('Error signing in anonymously:', error)
    return
  }

  revalidatePath('/')
}

const logout = async () => {
  const supabase = await createClientForServer()

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    return
  }
  revalidatePath('/')
}

const updateUser = async formData => {
  const supabase = await createClientForServer()

  const { error } = await supabase.auth.updateUser({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (error) {
    console.error('Error updating user:', error)
    return
  }

  console.log('User updated successfully, Please confiirm your email')

  revalidatePath('/')
}

const loginWithPassword = async formData => {
  const supabase = await createClientForServer()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (error) {
    console.error('Error logging in with password:', error)
    return
  }

  console.log('User logged in successfully')

  revalidatePath('/')
}

export { loginWithPassword, logout, signinAnonymously, updateUser }
