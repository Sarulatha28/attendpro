// Employee/Admin tab
const employeeTab = document.getElementById('employeeTab');
const adminTab = document.getElementById('adminTab');
const employeeForm = document.getElementById('employeeForm');
const adminCard = document.getElementById('adminCard');

employeeTab.addEventListener('click', () => {
  employeeTab.classList.add('active');
  adminTab.classList.remove('active');
  employeeForm.style.display = 'flex';
  adminCard.style.display = 'none';
});

adminTab.addEventListener('click', () => {
  adminTab.classList.add('active');
  employeeTab.classList.remove('active');
  employeeForm.style.display = 'none';
  adminCard.style.display = 'flex';
});

// Admin Sign In / Sign Up tabs
const signInTab = document.getElementById('signInTab');
const signUpTab = document.getElementById('signUpTab');
const adminSignInForm = document.getElementById('adminSignInForm');
const adminSignUpForm = document.getElementById('adminSignUpForm');

signInTab.addEventListener('click', () => {
  signInTab.classList.add('active');
  signUpTab.classList.remove('active');
  adminSignInForm.style.display='flex';
  adminSignUpForm.style.display='none';
});

signUpTab.addEventListener('click', () => {
  signUpTab.classList.add('active');
  signInTab.classList.remove('active');
  adminSignUpForm.style.display='flex';
  adminSignInForm.style.display='none';
});

// Dummy submission alerts
employeeForm.addEventListener('submit', e=>{ e.preventDefault(); alert("Employee login successful!"); });
adminSignInForm.addEventListener('submit', e=>{ e.preventDefault(); alert("Admin Sign In successful!"); });
adminSignUpForm.addEventListener('submit', e=>{ e.preventDefault(); alert("Admin Sign Up successful!"); });
