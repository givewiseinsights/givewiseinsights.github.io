/**
 * GiveWise Insights — Interactive Logic & Automation ROI Calculator
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('desktop-nav');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('nav-open');
    });
  }

  // Automation ROI & Leverage Calculator
  const teamSizeInput = document.getElementById('calc-team-size');
  const hoursInput = document.getElementById('calc-hours');
  const wageInput = document.getElementById('calc-wage');

  const teamSizeVal = document.getElementById('val-team-size');
  const hoursVal = document.getElementById('val-hours');
  const wageVal = document.getElementById('val-wage');

  const annualHoursOutput = document.getElementById('out-annual-hours');
  const annualSavingsOutput = document.getElementById('out-annual-savings');
  const paybackWeeksOutput = document.getElementById('out-payback-weeks');
  const leverageRatioOutput = document.getElementById('out-leverage-ratio');

  function updateCalculator() {
    if (!teamSizeInput || !hoursInput || !wageInput) return;

    const teamSize = parseInt(teamSizeInput.value, 10);
    const weeklyHours = parseInt(hoursInput.value, 10);
    const hourlyCost = parseInt(wageInput.value, 10);

    // Update display values
    if (teamSizeVal) teamSizeVal.textContent = `${teamSize} ${teamSize === 1 ? 'person' : 'people'}`;
    if (hoursVal) hoursVal.textContent = `${weeklyHours} hrs/wk`;
    if (wageVal) wageVal.textContent = `$${hourlyCost}/hr`;

    // Calculations based on 70% average automation recapture rate of repetitive administrative tasks
    const totalWeeklyHours = teamSize * weeklyHours;
    const weeklyReclaimedHours = Math.round(totalWeeklyHours * 0.70);
    const annualHoursReclaimed = weeklyReclaimedHours * 50; // 50 working weeks
    const annualGrossSavings = annualHoursReclaimed * hourlyCost;

    // Benchmark turnkey implementation fee average ($16,500)
    const benchmarkBuildCost = 16500;
    const weeklySavings = (annualGrossSavings / 50);
    const paybackWeeks = weeklySavings > 0 ? Math.max(2, Math.round(benchmarkBuildCost / weeklySavings)) : 12;
    const roiMultiplier = benchmarkBuildCost > 0 ? (annualGrossSavings / benchmarkBuildCost).toFixed(1) : '3.5';

    if (annualHoursOutput) {
      annualHoursOutput.textContent = `${annualHoursReclaimed.toLocaleString()} hrs`;
    }
    if (annualSavingsOutput) {
      annualSavingsOutput.textContent = `$${annualGrossSavings.toLocaleString()}`;
    }
    if (paybackWeeksOutput) {
      paybackWeeksOutput.textContent = `${paybackWeeks} weeks`;
    }
    if (leverageRatioOutput) {
      leverageRatioOutput.textContent = `${roiMultiplier}x`;
    }
  }

  if (teamSizeInput && hoursInput && wageInput) {
    teamSizeInput.addEventListener('input', updateCalculator);
    hoursInput.addEventListener('input', updateCalculator);
    wageInput.addEventListener('input', updateCalculator);
    updateCalculator(); // Initial render
  }

  // Executive Inquiry Form Handling
  const inquiryForm = document.getElementById('executive-inquiry-form');
  const formSuccessBox = document.getElementById('form-success-box');

  if (inquiryForm && formSuccessBox) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Scope...';
      }

      // Collect form fields
      const formData = {
        name: inquiryForm.querySelector('[name="name"]')?.value || '',
        company: inquiryForm.querySelector('[name="company"]')?.value || '',
        email: inquiryForm.querySelector('[name="email"]')?.value || '',
        scope: inquiryForm.querySelector('[name="scope"]')?.value || '',
        tier: inquiryForm.querySelector('[name="tier"]')?.value || 'Discovery'
      };

      // Formulate mailto fallback link for zero-friction direct transmission
      const subject = encodeURIComponent(`Executive AI Scope Inquiry — ${formData.company || formData.name}`);
      const body = encodeURIComponent(
        `Executive Inquiry for GiveWise Insights:\n\n` +
        `Name: ${formData.name}\n` +
        `Company: ${formData.company}\n` +
        `Email: ${formData.email}\n` +
        `Target Engagement: ${formData.tier}\n\n` +
        `Operational Workflow Context:\n${formData.scope}\n\n` +
        `Sent via givewiseinsights.josephjilovec.com`
      );

      setTimeout(() => {
        inquiryForm.style.display = 'none';
        formSuccessBox.style.display = 'block';
        // Open user's default email client pre-populated as a direct channel
        window.location.href = `mailto:contact@givewiseinsights.com?subject=${subject}&body=${body}`;
      }, 600);
    });
  }

  // Print Sample Trigger
  const printButton = document.querySelector('[data-print-sample]');
  if (printButton) {
    printButton.hidden = false;
    printButton.addEventListener('click', () => window.print());
  }
});
