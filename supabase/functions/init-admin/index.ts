import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const adminEmail = 'admin@cgc.ma';
    const adminPassword = 'cgc6983';

    // Check if admin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const adminExists = existingUsers?.users?.find(u => u.email === adminEmail);

    if (adminExists) {
      // Check if role already assigned
      const { data: roleExists } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', adminExists.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (!roleExists) {
        // Add admin role
        await supabase.from('user_roles').insert({
          user_id: adminExists.id,
          role: 'admin',
        });
        console.log('Admin role added to existing user');
      }

      return new Response(
        JSON.stringify({ success: true, message: 'Admin already exists' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create admin user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
    });

    if (createError) {
      console.error('Error creating admin:', createError);
      return new Response(
        JSON.stringify({ success: false, error: createError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add admin role
    const { error: roleError } = await supabase.from('user_roles').insert({
      user_id: newUser.user.id,
      role: 'admin',
    });

    if (roleError) {
      console.error('Error adding admin role:', roleError);
      return new Response(
        JSON.stringify({ success: false, error: roleError.message }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Admin user created successfully');
    return new Response(
      JSON.stringify({ success: true, message: 'Admin created successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
