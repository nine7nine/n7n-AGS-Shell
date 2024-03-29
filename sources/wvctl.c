#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <1 for show, 0 for hide>\n", argv[0]);
        return 1;
    }

    int action = atoi(argv[1]);

    if (action != 0 && action != 1) {
        fprintf(stderr, "Invalid argument: Use 1 to show or 0 to hide\n");
        return 1;
    }

    // Find the PID of the "wvkbd-mobintl" process
    FILE *cmd_output = popen("pgrep wvkbd-mobintl", "r");
    if (cmd_output == NULL) {
        perror("Error executing pgrep");
        return 1;
    }

    char pid_str[16];
    if (fgets(pid_str, sizeof(pid_str), cmd_output) == NULL) {
        fprintf(stderr, "wvkbd-mobintl process not found\n");
        return 1;
    }

    // Remove newline character from the PID string
    size_t len = strlen(pid_str);
    if (len > 0 && pid_str[len - 1] == '\n') {
        pid_str[len - 1] = '\0';
    }

    pid_t pid = atoi(pid_str);

    // Send SIGUSR2 to show or SIGUSR1 to hide based on the command-line argument
    int signal = (action == 1) ? SIGUSR2 : SIGUSR1;

    if (kill(pid, signal) == 0) {
        printf("Sent signal %d to PID %d\n", signal, pid);
    } else {
        perror("Error sending signal");
        return 1;
    }

    return 0;
}

