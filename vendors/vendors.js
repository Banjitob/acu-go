
        function showPage(id, el) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            document.querySelectorAll('.sidebar li a').forEach(a => a.classList.remove('active'));
            document.getElementById(id).classList.add('active');
            if (el) el.classList.add('active');
        }

        function openModal() {
            document.getElementById('modal').classList.add('active');
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
        }

        function closeModalOutside(e) {
            if (e.target.id === 'modal') closeModal();
        }

        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', function () {
                this.closest('.filter-tabs').querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
