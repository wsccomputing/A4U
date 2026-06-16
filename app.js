const STORAGE_KEY = 'pep_choices_learning_app_v1';

const defaultData = {
  currentUserId: null,
  users: [
    {
      id: 'stu-1',
      role: 'student',
      name: 'Amelia Carter',
      email: 'amelia@student.demo',
      password: 'demo123',
      mentorId: 'men-1',
      cohortId: 'cohort-a',
      institutionId: 'inst-1',
      reportId: 'REP-101',
      reportDate: '2026-03-01',
      behaviouralStyle: 'Collaborative Influencer',
      strengths: ['Builds rapport quickly', 'Communicates with empathy', 'Positive team energy'],
      developmentAreas: ['Improving structured follow-through', 'Handling difficult feedback directly'],
      scores: { resilience: 71, communication: 88, planning: 58, confidence: 79 },
      finalReportDate: '2026-12-01',
      leaveDate: null
    },
    {
      id: 'stu-2',
      role: 'student',
      name: 'Ethan Malik',
      email: 'ethan@student.demo',
      password: 'demo123',
      mentorId: 'men-1',
      cohortId: 'cohort-a',
      institutionId: 'inst-1',
      reportId: 'REP-102',
      reportDate: '2026-03-03',
      behaviouralStyle: 'Practical Achiever',
      strengths: ['Reliable execution', 'Strong self-discipline', 'Calm under pressure'],
      developmentAreas: ['Asking for help earlier', 'Reflecting before rushing into action'],
      scores: { resilience: 83, communication: 62, planning: 81, confidence: 68 },
      finalReportDate: '2026-12-01',
      leaveDate: null
    },
    {
      id: 'men-1',
      role: 'mentor',
      name: 'Priya Shah',
      email: 'priya@mentor.demo',
      password: 'demo123',
      assignedStudentIds: ['stu-1', 'stu-2']
    },
    {
      id: 'cur-1',
      role: 'curriculum_mentor',
      name: 'James Holden',
      email: 'james@curriculum.demo',
      password: 'demo123',
      assignedCohortIds: ['cohort-a']
    },
    {
      id: 'adm-1',
      role: 'admin',
      name: 'Nina Brooks',
      email: 'admin@platform.demo',
      password: 'demo123'
    },
    {
      id: 'inst-1-user',
      role: 'institution',
      name: 'Institution Lead',
      email: 'institution@demo.org',
      password: 'demo123',
      institutionId: 'inst-1'
    }
  ],
  cohorts: [
    { id: 'cohort-a', name: 'Spring Cohort A', institutionId: 'inst-1' }
  ],
  institutions: [
    { id: 'inst-1', name: 'Demo Sixth Form College' }
  ],
  assignments: [
    {
      id: 'asg-1',
      studentId: 'stu-1',
      title: 'Build a Structured Weekly Reflection',
      type: 'mandated',
      rationale: 'Create a weekly rhythm to reflect on what is working, where you are stuck, and what action to take next.',
      planning: 'I will review my week every Friday at 4pm and write three wins, one challenge, and one next step.',
      reviewDate: '2026-04-29',
      status: 'in_progress',
      createdAt: '2026-04-01',
      updatedAt: '2026-04-18',
      progressNotes: 'Started first two reflections. Need to make them more specific.',
      reviewHistory: [
        { date: '2026-04-10', reflection: 'I noticed I skip reflection when I feel busy. Scheduling it helped.' },
        { date: '2026-04-17', reflection: 'My reflections are clearer when I use the same questions each week.' }
      ]
    },
    {
      id: 'asg-2',
      studentId: 'stu-1',
      title: 'Practise Direct Feedback Conversations',
      type: 'recommended',
      rationale: 'Strengthen confidence in giving constructive feedback without avoiding difficult conversations.',
      planning: 'I will prepare one feedback conversation using SBI format and practise it with my mentor.',
      reviewDate: '2026-05-02',
      status: 'not_started',
      createdAt: '2026-04-03',
      updatedAt: '2026-04-03',
      progressNotes: '',
      reviewHistory: []
    },
    {
      id: 'asg-3',
      studentId: 'stu-2',
      title: 'Ask Earlier When Blocked',
      type: 'mandated',
      rationale: 'Reduce time lost to silent struggle by defining earlier escalation triggers.',
      planning: 'If I am blocked for more than 20 minutes, I will message my mentor or peer for support.',
      reviewDate: '2026-04-30',
      status: 'completed',
      createdAt: '2026-04-01',
      updatedAt: '2026-04-15',
      progressNotes: 'I asked for support twice this week instead of waiting until the end of the day.',
      reviewHistory: [
        { date: '2026-04-15', reflection: 'I felt more efficient and less frustrated by asking sooner.' }
      ]
    }
  ],
  notifications: [
    {
      id: 'n-1',
      userId: 'stu-1',
      type: 'reminder',
      title: 'Review due soon',
      message: 'Your assignment “Build a Structured Weekly Reflection” is due for review on 2026-04-29.',
      createdAt: '2026-04-22'
    },
    {
      id: 'n-2',
      userId: 'men-1',
      type: 'alert',
      title: 'Student inactivity alert',
      message: 'Amelia Carter has not updated one assignment in the last 14 days.',
      createdAt: '2026-04-22'
    }
  ],
  activityLog: [
    { id: 'act-1', userId: 'stu-1', date: '2026-04-18', text: 'Updated assignment progress note.' },
    { id: 'act-2', userId: 'stu-2', date: '2026-04-15', text: 'Completed a review cycle.' },
    { id: 'act-3', userId: 'men-1', date: '2026-04-20', text: 'Viewed student dashboard summary.' }
  ]
};

const roleLabels = {
  student: 'Student',
  mentor: 'Core Mentor',
  curriculum_mentor: 'Curriculum Mentor',
  admin: 'Administrator',
  institution: 'Institution'
};

const app = document.getElementById('app');
const ui = { page: 'dashboard', modal: null, filters: { assignmentStatus: 'all' } };

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
}

let state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function currentUser() {
  return state.users.find(u => u.id === state.currentUserId) || null;
}

function logout() {
  state.currentUserId = null;
  saveState();
  render();
}

function resetDemoData() {
  state = structuredClone(defaultData);
  saveState();
  ui.page = 'dashboard';
  ui.modal = null;
  render();
}

function formatDate(value) {
  if (!value) return '—';
  return new Date(value + 'T12:00:00').toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const today = new Date();
  const then = new Date(dateStr + 'T12:00:00');
  const diff = Math.ceil((then - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function percentCompleteForStudent(studentId) {
  const items = state.assignments.filter(a => a.studentId === studentId);
  if (!items.length) return 0;
  const score = items.reduce((acc, item) => {
    if (item.status === 'completed') return acc + 1;
    if (item.status === 'in_progress') return acc + 0.5;
    return acc;
  }, 0);
  return Math.round((score / items.length) * 100);
}

function getStudentsForUser(user) {
  if (!user) return [];
  if (user.role === 'student') return [user];
  if (user.role === 'mentor') return state.users.filter(u => u.role === 'student' && user.assignedStudentIds.includes(u.id));
  if (user.role === 'curriculum_mentor') return state.users.filter(u => u.role === 'student' && user.assignedCohortIds.includes(u.cohortId));
  if (user.role === 'institution') return state.users.filter(u => u.role === 'student' && u.institutionId === user.institutionId);
  if (user.role === 'admin') return state.users.filter(u => u.role === 'student');
  return [];
}

function getNotificationsForUser(user) {
  if (!user) return [];
  return state.notifications.filter(n => n.userId === user.id);
}

function getAlertsForViewer(user) {
  const visibleStudents = getStudentsForUser(user);
  return visibleStudents.flatMap(student => {
    const studentAssignments = state.assignments.filter(a => a.studentId === student.id);
    const lastUpdated = studentAssignments
      .map(a => a.updatedAt)
      .sort()
      .slice(-1)[0];
    const daysSince = lastUpdated ? Math.floor((Date.now() - new Date(lastUpdated + 'T12:00:00')) / (1000 * 60 * 60 * 24)) : 999;
    const alerts = [];
    if (daysSince > 14) alerts.push({ student: student.name, level: 'warning', text: `No assignment activity for ${daysSince} days.` });
    if (student.scores.planning < 60 || student.scores.communication < 65) alerts.push({ student: student.name, level: 'danger', text: 'Potential development risk indicator based on current report scores.' });
    return alerts;
  });
}

function exportUserData(user) {
  const students = getStudentsForUser(user);
  const payload = {
    exportedAt: new Date().toISOString(),
    viewer: user,
    students,
    assignments: state.assignments.filter(a => students.some(s => s.id === a.studentId)),
    notifications: getNotificationsForUser(user)
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pep-choices-export-${user.role}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function addActivity(userId, text) {
  state.activityLog.unshift({ id: generateId('act'), userId, date: new Date().toISOString().slice(0, 10), text });
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value.trim().toLowerCase();
  const password = form.password.value.trim();
  const user = state.users.find(u => u.email.toLowerCase() === email && u.password === password);
  const error = document.getElementById('auth-error');
  if (!user) {
    error.textContent = 'Incorrect email or password. Use one of the demo accounts shown below.';
    return;
  }
  state.currentUserId = user.id;
  saveState();
  render();
}

function handleQuickLogin(userId) {
  state.currentUserId = userId;
  saveState();
  render();
}

function openAssignmentModal(assignmentId = null, studentId = null) {
  const viewer = currentUser();
  const baseStudentId = studentId || (viewer.role === 'student' ? viewer.id : getStudentsForUser(viewer)[0]?.id);
  const assignment = assignmentId ? state.assignments.find(a => a.id === assignmentId) : null;
  ui.modal = { type: 'assignment', assignmentId, studentId: assignment?.studentId || baseStudentId };
  render();
}

function closeModal() {
  ui.modal = null;
  render();
}

function saveAssignment(event) {
  event.preventDefault();
  const form = event.target;
  const viewer = currentUser();
  const existing = ui.modal.assignmentId ? state.assignments.find(a => a.id === ui.modal.assignmentId) : null;
  const payload = {
    title: form.title.value.trim(),
    type: form.type.value,
    rationale: form.rationale.value.trim(),
    planning: form.planning.value.trim(),
    reviewDate: form.reviewDate.value,
    status: form.status.value,
    progressNotes: form.progressNotes.value.trim()
  };

  if (existing) {
    Object.assign(existing, payload, { updatedAt: new Date().toISOString().slice(0, 10) });
    if (form.newReflection.value.trim()) {
      existing.reviewHistory.unshift({ date: new Date().toISOString().slice(0, 10), reflection: form.newReflection.value.trim() });
    }
    addActivity(viewer.id, `Updated assignment “${existing.title}”.`);
  } else {
    state.assignments.unshift({
      id: generateId('asg'),
      studentId: ui.modal.studentId,
      createdAt: new Date().toISOString().slice(0, 10),
      updatedAt: new Date().toISOString().slice(0, 10),
      reviewHistory: form.newReflection.value.trim() ? [{ date: new Date().toISOString().slice(0, 10), reflection: form.newReflection.value.trim() }] : [],
      ...payload
    });
    addActivity(viewer.id, `Created assignment “${payload.title}”.`);
  }

  saveState();
  closeModal();
}

function deleteAssignment(assignmentId) {
  const item = state.assignments.find(a => a.id === assignmentId);
  if (!item) return;
  if (!confirm(`Delete “${item.title}”?`)) return;
  state.assignments = state.assignments.filter(a => a.id !== assignmentId);
  addActivity(currentUser().id, `Deleted assignment “${item.title}”.`);
  saveState();
  render();
}

function saveImportedStudents(event) {
  event.preventDefault();
  const text = event.target.importJson.value.trim();
  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) throw new Error('Expected an array.');
    parsed.forEach(item => {
      state.users.push({
        id: generateId('stu'),
        role: 'student',
        password: 'demo123',
        mentorId: item.mentorId || 'men-1',
        cohortId: item.cohortId || 'cohort-a',
        institutionId: item.institutionId || 'inst-1',
        reportId: item.reportId || generateId('REP'),
        reportDate: item.reportDate || new Date().toISOString().slice(0, 10),
        behaviouralStyle: item.behaviouralStyle || 'Emerging Learner Profile',
        strengths: item.strengths || ['Self-awareness'],
        developmentAreas: item.developmentAreas || ['Consistency'],
        scores: item.scores || { resilience: 60, communication: 60, planning: 60, confidence: 60 },
        finalReportDate: item.finalReportDate || null,
        leaveDate: item.leaveDate || null,
        ...item
      });
    });
    addActivity(currentUser().id, `Imported ${parsed.length} student record(s).`);
    saveState();
    closeModal();
  } catch (err) {
    alert('Import failed: ' + err.message);
  }
}

function navItemsForRole(role) {
  const common = [{ key: 'dashboard', label: 'Dashboard' }, { key: 'notifications', label: 'Notifications' }];
  if (role === 'student') return [...common, { key: 'assignments', label: 'Assignments' }, { key: 'timeline', label: 'Progress Timeline' }, { key: 'profile', label: 'My Report' }];
  if (role === 'mentor' || role === 'curriculum_mentor') return [...common, { key: 'students', label: 'Students' }, { key: 'analytics', label: 'Progress View' }];
  if (role === 'admin') return [...common, { key: 'students', label: 'Users & Cohorts' }, { key: 'analytics', label: 'Analytics' }, { key: 'admin', label: 'Data & Settings' }];
  if (role === 'institution') return [...common, { key: 'students', label: 'Institution Cohort' }, { key: 'analytics', label: 'Institution Analytics' }];
  return common;
}

function renderLogin() {
  const demoAccounts = state.users.map(user => `
    <div class="assignment-item">
      <div class="assignment-head">
        <div>
          <strong>${user.name}</strong>
          <div class="small muted">${roleLabels[user.role]} · ${user.email}</div>
          <div class="tiny muted">Password: demo123</div>
        </div>
        <button class="btn" onclick="handleQuickLogin('${user.id}')">Use account</button>
      </div>
    </div>
  `).join('');

  app.innerHTML = `
    <div class="auth-wrap">
      <div class="auth-card">
        <section class="hero-panel">
          <div class="brand">
            <div class="brand-badge">AF</div>
            <div>
              <h1>Efficas</h1>
              <p>Learning and Mentoring portal</p>
            </div>
          </div>
          <h1>Knowledge, Mindset and Know-How to succeeed.</h1>
         
          <ul>
            <li>Student dashboard with report insights</li>
            <li>Assignment planning, review, and iteration</li>
            <li>Mentor, curriculum, admin, and institution views</li>
            <li>Notifications, alerts, exports, and analytics</li>
          </ul>
        </section>
        <section class="form-panel">
          <h2>Sign in</h2>
          <p class="muted">Use a demo account or log in manually.</p>
          <form onsubmit="handleLogin(event)">
            <label>Email
              <input name="email" type="email" placeholder="name@example.com" required />
            </label>
            <label>Password
              <input name="password" type="password" placeholder="demo123" required />
            </label>
            <button class="btn primary" type="submit">Log in</button>
            <p id="auth-error" class="small" style="color: var(--danger); min-height: 20px;"></p>
          </form>
          <div class="footer-note">Tip: start with Amelia Carter (student) or Priya Shah (mentor).</div>
        </section>
      </div>
      <div class="card" style="width:min(920px,100%); margin-top:18px;">
        <h3>Demo accounts</h3>
        <div class="list">${demoAccounts}</div>
      </div>
    </div>
  `;
}

function renderSidebar(user) {
  const items = navItemsForRole(user.role).map(item => `
    <button class="${ui.page === item.key ? 'active' : ''}" onclick="setPage('${item.key}')">
      <span>${item.label}</span>
      <span>›</span>
    </button>
  `).join('');

  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-badge">AF</div>
        <div>
          <h1>Addvantage For You</h1>
          <p>${roleLabels[user.role]}</p>
        </div>
      </div>
      <div class="nav">${items}</div>
      <div class="sidebar-footer">
        <strong>${user.name}</strong>
        <div class="small">${user.email}</div>
        <div class="inline-actions">
          <button class="btn" onclick="logout()">Log out</button>
        </div>
      </div>
    </aside>
  `;
}

function renderStudentDashboard(user) {
  const assignments = state.assignments.filter(a => a.studentId === user.id);
  const progress = percentCompleteForStudent(user.id);
  const upcoming = assignments.filter(a => a.reviewDate).sort((a, b) => a.reviewDate.localeCompare(b.reviewDate)).slice(0, 3);

  return `
    <div class="grid cols-4">
      <div class="card"><div class="muted small">Overall progress</div><div class="stat-value">${progress}%</div><div class="progress"><span style="width:${progress}%"></span></div></div>
      <div class="card"><div class="muted small">Strengths</div><div class="stat-value">${user.strengths.length}</div><div class="small muted">Identified in report</div></div>
      <div class="card"><div class="muted small">Development areas</div><div class="stat-value">${user.developmentAreas.length}</div><div class="small muted">Targeted growth themes</div></div>
      <div class="card"><div class="muted small">Next review</div><div class="stat-value">${upcoming[0] ? formatDate(upcoming[0].reviewDate) : '—'}</div><div class="small muted">Stay consistent</div></div>
    </div>

    <div class="split" style="margin-top:18px;">
      <div class="grid">
        <div class="card">
          <h3>Report snapshot</h3>
          <p class="muted">Behavioural style: <strong>${user.behaviouralStyle}</strong></p>
          <div class="grid cols-2">
            <div class="kpi"><div class="small muted">Resilience</div><div class="stat-value">${user.scores.resilience}</div></div>
            <div class="kpi"><div class="small muted">Communication</div><div class="stat-value">${user.scores.communication}</div></div>
            <div class="kpi"><div class="small muted">Planning</div><div class="stat-value">${user.scores.planning}</div></div>
            <div class="kpi"><div class="small muted">Confidence</div><div class="stat-value">${user.scores.confidence}</div></div>
          </div>
          <div class="grid cols-2" style="margin-top:16px;">
            <div>
              <h4>Strengths</h4>
              <div class="tag-row">${user.strengths.map(s => `<span class="badge success">${s}</span>`).join('')}</div>
            </div>
            <div>
              <h4>Development areas</h4>
              <div class="tag-row">${user.developmentAreas.map(s => `<span class="badge warning">${s}</span>`).join('')}</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="assignment-head">
            <div>
              <h3>Assignments</h3>
              <p class="muted">Plan actions, revisit them, and log what changed.</p>
            </div>
            <button class="btn primary" onclick="openAssignmentModal(null, '${user.id}')">New assignment</button>
          </div>
          <div class="list">
            ${renderAssignmentList(assignments, user)}
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <h3>Upcoming reviews</h3>
          <div class="list">
            ${upcoming.length ? upcoming.map(item => `
              <div class="timeline-row">
                <strong>${item.title}</strong>
                <div class="small muted">${formatDate(item.reviewDate)} · ${daysUntil(item.reviewDate)} day(s) left</div>
              </div>`).join('') : '<div class="empty">No reviews scheduled yet.</div>'}
          </div>
        </div>
        <div class="card">
          <h3>Recent activity</h3>
          <div class="list">
            ${state.activityLog.filter(a => a.userId === user.id).slice(0, 5).map(item => `
              <div class="timeline-row"><strong>${formatDate(item.date)}</strong><div class="small muted">${item.text}</div></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAssignmentList(assignments, viewer) {
  const filtered = assignments.filter(item => ui.filters.assignmentStatus === 'all' || item.status === ui.filters.assignmentStatus);
  if (!filtered.length) return '<div class="empty">No assignments match this filter.</div>';
  return filtered.map(item => `
    <div class="assignment-item">
      <div class="assignment-head">
        <div>
          <strong>${item.title}</strong>
          <div class="tag-row" style="margin-top:8px;">
            <span class="badge info">${item.type}</span>
            <span class="badge ${item.status === 'completed' ? 'success' : item.status === 'in_progress' ? 'warning' : ''}">${item.status.replace('_', ' ')}</span>
            <span class="badge">Review ${formatDate(item.reviewDate)}</span>
          </div>
          <p class="small muted">${item.rationale}</p>
        </div>
        <div class="inline-actions">
          <button class="btn" onclick="openAssignmentModal('${item.id}')">Open</button>
          ${viewer.role === 'student' || viewer.role === 'admin' ? `<button class="btn danger" onclick="deleteAssignment('${item.id}')">Delete</button>` : ''}
        </div>
      </div>
      <div class="small"><strong>Plan:</strong> ${item.planning || 'No planning note yet.'}</div>
      <div class="small muted" style="margin-top:8px;">Last updated ${formatDate(item.updatedAt)} · ${item.reviewHistory.length} review(s) logged</div>
    </div>
  `).join('');
}

function renderStudentAssignments(user) {
  const assignments = state.assignments.filter(a => a.studentId === user.id);
  return `
    <div class="card">
      <div class="assignment-head">
        <div>
          <h3>All assignments</h3>
          <p class="muted">Track mandated, recommended, and optional development work.</p>
        </div>
        <div class="inline-actions">
          <select onchange="setAssignmentFilter(this.value)">
            <option value="all" ${ui.filters.assignmentStatus === 'all' ? 'selected' : ''}>All statuses</option>
            <option value="not_started" ${ui.filters.assignmentStatus === 'not_started' ? 'selected' : ''}>Not started</option>
            <option value="in_progress" ${ui.filters.assignmentStatus === 'in_progress' ? 'selected' : ''}>In progress</option>
            <option value="completed" ${ui.filters.assignmentStatus === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
          <button class="btn primary" onclick="openAssignmentModal(null, '${user.id}')">Add assignment</button>
        </div>
      </div>
      <div class="list">${renderAssignmentList(assignments, user)}</div>
    </div>
  `;
}

function renderStudentTimeline(user) {
  const timeline = state.assignments.filter(a => a.studentId === user.id)
    .flatMap(a => [{ date: a.createdAt, text: `Started ${a.title}` }, ...a.reviewHistory.map(r => ({ date: r.date, text: `Review for ${a.title}: ${r.reflection}` }))])
    .sort((a, b) => b.date.localeCompare(a.date));

  return `
    <div class="card">
      <h3>Progress timeline</h3>
      <p class="muted">A simple record of action and reflection over time.</p>
      <div class="list">
        ${timeline.length ? timeline.map(item => `<div class="timeline-row"><strong>${formatDate(item.date)}</strong><div class="small muted">${item.text}</div></div>`).join('') : '<div class="empty">No timeline entries yet.</div>'}
      </div>
    </div>
  `;
}

function renderStudentProfile(user) {
  const mentor = state.users.find(u => u.id === user.mentorId);
  return `
    <div class="grid cols-2">
      <div class="card">
        <h3>My report</h3>
        <table class="table">
          <tr><th>Report ID</th><td>${user.reportId}</td></tr>
          <tr><th>Report date</th><td>${formatDate(user.reportDate)}</td></tr>
          <tr><th>Behavioural style</th><td>${user.behaviouralStyle}</td></tr>
          <tr><th>Mentor</th><td>${mentor?.name || '—'}</td></tr>
          <tr><th>Data deletion rule</th><td>6 months after final report or leaving institution</td></tr>
        </table>
      </div>
      <div class="card">
        <h3>Development focus</h3>
        <h4>Strengths</h4>
        <div class="tag-row">${user.strengths.map(s => `<span class="badge success">${s}</span>`).join('')}</div>
        <h4 style="margin-top:18px;">Development areas</h4>
        <div class="tag-row">${user.developmentAreas.map(s => `<span class="badge warning">${s}</span>`).join('')}</div>
      </div>
    </div>
  `;
}

function renderUsersPage(user) {
  const students = getStudentsForUser(user);
  return `
    <div class="card">
      <div class="assignment-head">
        <div>
          <h3>${user.role === 'admin' ? 'Users & cohorts' : 'Students overview'}</h3>
          <p class="muted">Monitor report summaries, progress, and risk indicators.</p>
        </div>
        ${user.role === 'admin' ? '<button class="btn primary" onclick="openImportModal()">Import data</button>' : ''}
      </div>
      <table class="table">
        <thead><tr><th>Name</th><th>Cohort</th><th>Progress</th><th>Planning</th><th>Communication</th><th>Action</th></tr></thead>
        <tbody>
          ${students.map(student => `
            <tr>
              <td><strong>${student.name}</strong><div class="tiny muted">${student.email}</div></td>
              <td>${state.cohorts.find(c => c.id === student.cohortId)?.name || '—'}</td>
              <td>${percentCompleteForStudent(student.id)}%</td>
              <td>${student.scores.planning}</td>
              <td>${student.scores.communication}</td>
              <td><button class="btn" onclick="openStudentSummary('${student.id}')">View</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAnalyticsPage(user) {
  const students = getStudentsForUser(user);
  const assignments = state.assignments.filter(a => students.some(s => s.id === a.studentId));
  const completed = assignments.filter(a => a.status === 'completed').length;
  const inProgress = assignments.filter(a => a.status === 'in_progress').length;
  const notStarted = assignments.filter(a => a.status === 'not_started').length;
  const avgProgress = students.length ? Math.round(students.reduce((sum, s) => sum + percentCompleteForStudent(s.id), 0) / students.length) : 0;
  const avgReviews = assignments.length ? (assignments.reduce((sum, a) => sum + a.reviewHistory.length, 0) / assignments.length).toFixed(1) : '0.0';

  return `
    <div class="grid cols-4">
      <div class="card"><div class="muted small">Students in scope</div><div class="stat-value">${students.length}</div></div>
      <div class="card"><div class="muted small">Average completion</div><div class="stat-value">${avgProgress}%</div></div>
      <div class="card"><div class="muted small">Assignments completed</div><div class="stat-value">${completed}</div></div>
      <div class="card"><div class="muted small">Average reviews / assignment</div><div class="stat-value">${avgReviews}</div></div>
    </div>

    <div class="grid cols-2" style="margin-top:18px;">
      <div class="card">
        <h3>Assignment status mix</h3>
        <div class="list">
          <div class="timeline-row"><strong>Completed</strong><div class="small muted">${completed}</div></div>
          <div class="timeline-row"><strong>In progress</strong><div class="small muted">${inProgress}</div></div>
          <div class="timeline-row"><strong>Not started</strong><div class="small muted">${notStarted}</div></div>
        </div>
      </div>
      <div class="card">
        <h3>Alerts needing attention</h3>
        <div class="list">
          ${getAlertsForViewer(user).length ? getAlertsForViewer(user).map(alert => `<div class="alert-row"><span class="badge ${alert.level}">${alert.student}</span><div class="small muted" style="margin-top:8px;">${alert.text}</div></div>`).join('') : '<div class="empty">No current alerts.</div>'}
        </div>
      </div>
    </div>
  `;
}

function renderNotificationsPage(user) {
  const items = getNotificationsForUser(user);
  return `
    <div class="card">
      <h3>Notifications & alerts</h3>
      <div class="list">
        ${items.length ? items.map(item => `<div class="alert-row"><strong>${item.title}</strong><div class="small muted">${item.message}</div><div class="tiny muted" style="margin-top:6px;">${formatDate(item.createdAt)}</div></div>`).join('') : '<div class="empty">No notifications yet.</div>'}
      </div>
    </div>
  `;
}

function renderAdminPage(user) {
  return `
    <div class="grid cols-2">
      <div class="card">
        <h3>Data operations</h3>
        <p class="muted">Import student data manually, export current records, or reset the demo state.</p>
        <div class="inline-actions">
          <button class="btn primary" onclick="openImportModal()">Import JSON</button>
          <button class="btn" onclick="exportUserData(currentUser())">Export all visible data</button>
          <button class="btn danger" onclick="resetDemoData()">Reset demo data</button>
        </div>
      </div>
      <div class="card">
        <h3>Compliance note</h3>
        <p class="muted">This static-host version stores data in the browser only. For production use, replace localStorage with a secure backend and implement deletion jobs, role-based auth, encrypted storage, and consent/compliance workflows.</p>
        <div class="notice">Recommended upgrade path: Netlify or GitHub Pages for frontend + Supabase for authentication, database, row-level security, and storage.</div>
      </div>
    </div>
  `;
}

function renderModal() {
  if (!ui.modal) return '';

  if (ui.modal.type === 'assignment') {
    const existing = ui.modal.assignmentId ? state.assignments.find(a => a.id === ui.modal.assignmentId) : null;
    return `
      <div class="modal-backdrop" onclick="backdropClose(event)">
        <div class="modal">
          <div class="assignment-head">
            <div>
              <h3>${existing ? 'Edit assignment' : 'Create assignment'}</h3>
              <p class="muted">Add planning details, set a review date, and record reflection over time.</p>
            </div>
            <button class="btn" onclick="closeModal()">Close</button>
          </div>
          <form onsubmit="saveAssignment(event)">
            <div class="grid cols-2">
              <label>Title<input name="title" value="${existing?.title || ''}" required /></label>
              <label>Type<select name="type">
                <option value="mandated" ${existing?.type === 'mandated' ? 'selected' : ''}>Mandated</option>
                <option value="recommended" ${existing?.type === 'recommended' ? 'selected' : ''}>Recommended</option>
                <option value="optional" ${existing?.type === 'optional' ? 'selected' : ''}>Optional</option>
              </select></label>
            </div>
            <label>Rationale<textarea name="rationale">${existing?.rationale || ''}</textarea></label>
            <label>Planning / input<textarea name="planning">${existing?.planning || ''}</textarea></label>
            <div class="grid cols-2">
              <label>Review date<input name="reviewDate" type="date" value="${existing?.reviewDate || ''}" /></label>
              <label>Status<select name="status">
                <option value="not_started" ${existing?.status === 'not_started' ? 'selected' : ''}>Not started</option>
                <option value="in_progress" ${existing?.status === 'in_progress' ? 'selected' : ''}>In progress</option>
                <option value="completed" ${existing?.status === 'completed' ? 'selected' : ''}>Completed</option>
              </select></label>
            </div>
            <label>Progress notes<textarea name="progressNotes">${existing?.progressNotes || ''}</textarea></label>
            <label>Add review reflection<textarea name="newReflection" placeholder="What changed? What did you learn? What should happen next?"></textarea></label>
            ${existing?.reviewHistory?.length ? `<div class="card" style="padding:14px; background:var(--surface-2);">
              <strong>Previous reviews</strong>
              <div class="list" style="margin-top:10px;">${existing.reviewHistory.map(item => `<div class="timeline-row"><strong>${formatDate(item.date)}</strong><div class="small muted">${item.reflection}</div></div>`).join('')}</div>
            </div>` : ''}
            <div class="inline-actions">
              <button class="btn primary" type="submit">Save assignment</button>
              <button class="btn" type="button" onclick="closeModal()">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.type === 'import') {
    return `
      <div class="modal-backdrop" onclick="backdropClose(event)">
        <div class="modal">
          <div class="assignment-head">
            <div>
              <h3>Import student data</h3>
              <p class="muted">Paste a JSON array of student records to simulate spreadsheet/manual imports.</p>
            </div>
            <button class="btn" onclick="closeModal()">Close</button>
          </div>
          <form onsubmit="saveImportedStudents(event)">
            <label>JSON payload
              <textarea name="importJson" style="min-height:260px;">[
  {
    "name": "New Student",
    "email": "new@student.demo",
    "behaviouralStyle": "Reflective Planner",
    "strengths": ["Listening"],
    "developmentAreas": ["Confidence"],
    "scores": {"resilience": 70, "communication": 64, "planning": 73, "confidence": 55}
  }
]</textarea>
            </label>
            <div class="inline-actions">
              <button class="btn primary" type="submit">Import records</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (ui.modal.type === 'studentSummary') {
    const student = state.users.find(u => u.id === ui.modal.studentId);
    const assignments = state.assignments.filter(a => a.studentId === student.id);
    return `
      <div class="modal-backdrop" onclick="backdropClose(event)">
        <div class="modal">
          <div class="assignment-head">
            <div>
              <h3>${student.name}</h3>
              <p class="muted">${student.behaviouralStyle}</p>
            </div>
            <button class="btn" onclick="closeModal()">Close</button>
          </div>
          <div class="grid cols-2">
            <div class="card" style="box-shadow:none; border:1px solid var(--line);">
              <h4>Profile</h4>
              <table class="table">
                <tr><th>Email</th><td>${student.email}</td></tr>
                <tr><th>Report</th><td>${student.reportId}</td></tr>
                <tr><th>Completion</th><td>${percentCompleteForStudent(student.id)}%</td></tr>
              </table>
              <div class="tag-row">${student.developmentAreas.map(s => `<span class="badge warning">${s}</span>`).join('')}</div>
            </div>
            <div class="card" style="box-shadow:none; border:1px solid var(--line);">
              <h4>Assignments</h4>
              <div class="list">${assignments.map(a => `<div class="timeline-row"><strong>${a.title}</strong><div class="small muted">${a.status.replace('_', ' ')} · review ${formatDate(a.reviewDate)}</div></div>`).join('')}</div>
            </div>
          </div>
          <div class="inline-actions" style="margin-top:16px;">
            <button class="btn primary" onclick="openAssignmentModal(null, '${student.id}')">Add assignment</button>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

function renderMain(user) {
  let content = '';
  if (user.role === 'student') {
    if (ui.page === 'dashboard') content = renderStudentDashboard(user);
    if (ui.page === 'assignments') content = renderStudentAssignments(user);
    if (ui.page === 'timeline') content = renderStudentTimeline(user);
    if (ui.page === 'profile') content = renderStudentProfile(user);
    if (ui.page === 'notifications') content = renderNotificationsPage(user);
  } else {
    if (ui.page === 'dashboard') content = renderAnalyticsPage(user);
    if (ui.page === 'students') content = renderUsersPage(user);
    if (ui.page === 'analytics') content = renderAnalyticsPage(user);
    if (ui.page === 'notifications') content = renderNotificationsPage(user);
    if (ui.page === 'admin' && user.role === 'admin') content = renderAdminPage(user);
  }

  const studentsInScope = getStudentsForUser(user).length;
  app.innerHTML = `
    <div class="app-shell">
      ${renderSidebar(user)}
      <main class="main">
        <div class="topbar">
          <div class="page-title">
            <h2>${pageTitle()}</h2>
            <p>${pageDescription(user, studentsInScope)}</p>
          </div>
          <div class="topbar-actions">
            <button class="btn" onclick="window.print()">Print</button>
            <button class="btn" onclick="exportUserData(currentUser())">Export</button>
            <button class="btn danger" onclick="resetDemoData()">Reset</button>
          </div>
        </div>
        ${content}
        <div class="footer-note">Frontend-only deployment. Data stays in this browser unless you connect a backend.</div>
      </main>
    </div>
    ${renderModal()}
  `;
}

function pageTitle() {
  const mapping = {
    dashboard: 'Dashboard',
    assignments: 'Assignments',
    timeline: 'Progress Timeline',
    profile: 'My Report',
    students: 'Students',
    analytics: 'Analytics',
    notifications: 'Notifications',
    admin: 'Administration'
  };
  return mapping[ui.page] || 'Dashboard';
}

function pageDescription(user, count) {
  if (user.role === 'student') {
    if (ui.page === 'dashboard') return 'View report insights, complete development work, and stay on top of reviews.';
    if (ui.page === 'assignments') return 'Mandated, recommended, and optional assignments in one place.';
    if (ui.page === 'timeline') return 'See how your reflection and progress change over time.';
    if (ui.page === 'profile') return 'Your report, mentor relationship, and development priorities.';
  }
  return `You currently have visibility of ${count} student record(s).`;
}

function render() {
  const user = currentUser();
  if (!user) return renderLogin();
  const availablePages = navItemsForRole(user.role).map(n => n.key);
  if (!availablePages.includes(ui.page)) ui.page = 'dashboard';
  renderMain(user);
}

function setPage(page) {
  ui.page = page;
  render();
}

function setAssignmentFilter(value) {
  ui.filters.assignmentStatus = value;
  render();
}

function openImportModal() {
  ui.modal = { type: 'import' };
  render();
}

function openStudentSummary(studentId) {
  ui.modal = { type: 'studentSummary', studentId };
  render();
}

function backdropClose(event) {
  if (event.target.classList.contains('modal-backdrop')) closeModal();
}

window.handleLogin = handleLogin;
window.handleQuickLogin = handleQuickLogin;
window.logout = logout;
window.resetDemoData = resetDemoData;
window.openAssignmentModal = openAssignmentModal;
window.closeModal = closeModal;
window.saveAssignment = saveAssignment;
window.deleteAssignment = deleteAssignment;
window.setPage = setPage;
window.setAssignmentFilter = setAssignmentFilter;
window.exportUserData = exportUserData;
window.openImportModal = openImportModal;
window.saveImportedStudents = saveImportedStudents;
window.openStudentSummary = openStudentSummary;
window.backdropClose = backdropClose;
window.currentUser = currentUser;

render();
