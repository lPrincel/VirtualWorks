document.addEventListener('DOMContentLoaded', () => {
    const teamListContainer = document.getElementById('team-list');

    // Fetch and render team on load
    fetchTeam();

    async function fetchTeam() {
        try {
            const response = await fetch('/api/team');
            const data = await response.json();

            if (data.status === 'success') {
                renderTeam(data.team);
            } else {
                console.error('Failed to load team data:', data.error);
            }
        } catch (error) {
            console.error('Error fetching team:', error);
        }
    }

    function renderTeam(team) {
        teamListContainer.innerHTML = '';

        team.forEach(member => {
            const teamItem = document.createElement('div');
            teamItem.className = 'team-item';

            // User Info (Left)
            const userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            
            const nameEl = document.createElement('div');
            nameEl.className = 'user-name';
            nameEl.textContent = member.name;
            
            const roleEl = document.createElement('div');
            roleEl.className = 'user-role';
            roleEl.textContent = member.role;
            
            userInfo.appendChild(nameEl);
            userInfo.appendChild(roleEl);

            // Toggle Button (Right)
            const toggleBtn = document.createElement('button');
            toggleBtn.className = `status-toggle ${member.is_available ? 'status-available' : 'status-busy'}`;
            toggleBtn.dataset.userId = member.id;
            
            const dot = document.createElement('span');
            dot.className = 'status-dot';
            
            const text = document.createTextNode(member.is_available ? ' AVAILABLE' : ' BUSY');
            
            toggleBtn.appendChild(dot);
            toggleBtn.appendChild(text);

            // Click Event for Toggle
            toggleBtn.addEventListener('click', () => handleToggle(member.id, toggleBtn));

            teamItem.appendChild(userInfo);
            teamItem.appendChild(toggleBtn);
            
            teamListContainer.appendChild(teamItem);
        });
    }

    async function handleToggle(userId, buttonElement) {
        // Disable temporarily to prevent double clicks
        buttonElement.disabled = true;

        try {
            const response = await fetch(`/api/toggle/${userId}`, {
                method: 'POST'
            });
            const data = await response.json();

            if (data.status === 'success') {
                updateToggleButton(buttonElement, data.is_available);
            } else {
                console.error('Failed to toggle status:', data.error);
            }
        } catch (error) {
            console.error('Error toggling status:', error);
        } finally {
            buttonElement.disabled = false;
        }
    }

    function updateToggleButton(button, isAvailable) {
        // Remove existing state classes
        button.classList.remove('status-available', 'status-busy');
        
        // Add new state class
        button.classList.add(isAvailable ? 'status-available' : 'status-busy');
        
        // Update text node (it's the second child after the dot)
        button.childNodes[1].nodeValue = isAvailable ? ' AVAILABLE' : ' BUSY';
    }
});
