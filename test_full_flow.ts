
// test_full_flow.ts
import { createTemplate, saveTemplateDay, deleteTemplate, getPlanTemplates, getTemplateDetails } from './src/app/admin/actions';
import { createClient } from './src/lib/supabase/server';

async function runTest() {
    console.log('🧪 Starting Full Functional Test...');

    // 1. Create Template
    console.log('\n[1/5] Creating Template...');
    const templateName = `Test Plan ${Date.now()}`;
    let template;
    try {
        template = await createTemplate(templateName);
        console.log('✅ Template Created:', template.id, template.name);
    } catch (e) {
        console.error('❌ Failed to create template:', e);
        return;
    }

    // 2. Add Meals (Simulate Editor Save)
    console.log('\n[2/5] Adding Meals to Day 1...');
    const meals = [
        { name: 'Test Breakfast', time: '08:00', description: 'Eggs', target_calories: 300 },
        { name: 'Test Lunch', time: '12:00', description: 'Chicken', target_calories: 500 }
    ];
    try {
        await saveTemplateDay(template.id, 1, meals);
        console.log('✅ Day 1 Saved.');
    } catch (e) {
        console.error('❌ Failed to save day:', e);
    }

    // 3. Verify Data
    console.log('\n[3/5] Verifying Data...');
    const details = await getTemplateDetails(template.id);
    if (details && details.days.length > 0 && details.days[0].meals_json.length === 2) {
        console.log('✅ Data Verified: Meals found in DB.');
    } else {
        console.error('❌ Data Verification Failed:', details);
    }

    // 4. Delete Template
    console.log('\n[4/5] Deleting Template...');
    try {
        await deleteTemplate(template.id);
        console.log('✅ Template Deleted.');
    } catch (e) {
        console.error('❌ Failed to delete template:', e);
    }

    // 5. Verify Deletion
    console.log('\n[5/5] Verifying Deletion...');
    const allTemplates = await getPlanTemplates();
    const found = allTemplates.find((t: { id: string }) => t.id === template.id);
    if (!found) {
        console.log('✅ Deletion Verified: Template not found in list.');
    } else {
        console.error('❌ Deletion Verification Failed: Template still exists.');
    }

    console.log('\n🎉 Test Complete.');
}

// Mocking requireAdmin for test purposes if needed, 
// strictly speaking we can't easily mock the Next.js cache/redirects in a standalone script without setup.
// So this script might fail due to 'redirect' calls in 'requireAdmin'.
// We will check the output. If it fails due to Auth, I'll need a different strategy 
// (e.g. relying on manual test or using a special test entry point).

runTest();
