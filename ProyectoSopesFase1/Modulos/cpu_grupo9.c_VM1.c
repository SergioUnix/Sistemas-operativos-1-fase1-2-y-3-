#include <linux/module.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/kernel.h>
#include <linux/sched.h>
#include  <linux/smp.h>
#include <linux/sem.h>
#include <linux/signal.h>
#include <linux/securebits.h>
#include <linux/fs_struct.h>
#include <linux/compiler.h>
#include <linux/completion.h>
#include <linux/pid.h>
#include <linux/percpu.h>
#include <linux/topology.h>


/*  Ejemplo
void RECURSIVO2(struct task_struct *task,struct seq_file *m)
{
struct task_struct *task;
struct list_head *list;


list_for_each(list, &task->children) {
    task = list_entry(list, struct task_struct, sibling);
}
}*/

void RECURSIVO(struct task_struct *task,struct seq_file *m)
{
    struct task_struct *hijos;
    struct list_head *array;

    seq_printf(m,"\t{\n");
    seq_printf(m, "\t\"nombreVM\" : \"vm1\" ,\n");
    seq_printf(m,"\t\t\"nombre\" : \"%s\",\n", task->comm);
    seq_printf(m,"\t\t\"pid\" : %d,\n", task->pid);
    seq_printf(m,"\t\t\"state\" : %li,\n", task->state);
    seq_printf(m,"\t\t\"pidpadre\" : %d\n", task->parent->pid);
    seq_printf(m,"\t}");
    list_for_each(array, &task->children) {
        seq_printf(m,",\n");
        hijos = list_entry(array, struct task_struct, sibling);
        RECURSIVO(hijos,m);
    }
}

static int mostrar_init(struct seq_file *m, void *v)
{
    seq_printf(m,"[\n");
    RECURSIVO(&init_task,m);
    seq_printf(m,"\n]\n");
    return 0;
}
static ssize_t pintar_init(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)
{
    return 0;
}

static int abrir_init(struct inode *inode, struct file *file)
{
    return single_open(file, mostrar_init, NULL);
}


/*  static struct proc_ops skynet_fops = {
  .owner = THIS_MODULE,
  .open = skynet_open,
  .read = seq_read,
  .llseek = seq_lseek,
  .release = single_release,
}; */

static struct proc_ops archivo_init={
    .proc_open = abrir_init,
    .proc_release = single_release,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_write = pintar_init
};


/*
static int __init skynet_init(void) {
  proc_create("skynet", 0, NULL, &skynet_fops);
  printk(KERN_INFO "Skynet in control\n");

  return 0;
}
}*/

static int __init inicio(void)
{
    struct proc_dir_entry *entry;
    entry = proc_create("cpu_grupo9.json", 0777, NULL, &archivo_init);
    if (!entry)
    {
        return -1;
    }
    if (entry)
    {
        printk(KERN_INFO "Modulo cpu del grupo9 Cargado\n");
    }
    return 0;
}
/*
static void __exit mymodule_exit(void)
{
 printk ("Unloading my module.\n");
        return;
}*/
static void __exit end(void)
{
    remove_proc_entry("cpu_grupo9.json", NULL);
    printk(KERN_INFO "Modulo cpu del grupo9 Desmontado\n");
}
module_init(inicio);
module_exit(end);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Sergio Ariel Ramirez Castro - grupo9");
