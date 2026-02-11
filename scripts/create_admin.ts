import { createClient } from '@supabase/supabase-js'

// Usage: npx tsx --env-file=.env.local scripts/create_admin.ts <email>

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase Environment Variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function promoteToAdmin(email: string) {
    console.log(`🔍 Looking for user: ${email}...`)

    // 1. Find User by Email (using Admin API)
    const { data: { users }, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
        console.error('❌ Error listing users:', userError.message)
        process.exit(1)
    }

    const user = users.find(u => u.email === email)

    if (!user) {
        console.error('❌ User not found!')
        process.exit(1)
    }

    console.log(`✅ User found: ${user.id}`)

    // 2. Update Profile Role
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id)

    if (updateError) {
        console.error('❌ Failed to update profile:', updateError.message)
        process.exit(1)
    }

    console.log(`🎉 Success! User ${email} is now an ADMIN.`)
}

const email = process.argv[2]
if (!email) {
    console.error('Usage: npx tsx --env-file=.env.local scripts/create_admin.ts <email>')
    process.exit(1)
}

promoteToAdmin(email)
