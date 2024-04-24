// class Node {
//     constructor(data, next = null) {
//         this.data = data
//         this.next = next
//     }
// }

const { Router } = require("express");

// class Linkedlist {
//     constructor() {
//         this.head = null
//         this.size = 0
//     }
//     // Insert node to the first
//     insertFirst(data) {
//         this.head = new Node(data, this.head)
//         this.size++
//     }
//     // Insert node to the last
//     insertLast(data) {
//         let node = new Node(data)
//         let current
//         if(!this.head) {
//             this.head = node
//         } else {
//             current = this.head
//             while(current.next) {
//                 current = current.next
//             }
//             current.next = node
//         }
//         this.size++
//     }
//     printListData() {
//         let current = this.head
//         while(current) {
//             console.log(current.data)
//             current = current.next
//         }
//     }
// }

// const ll = new Linkedlist()
// ll.insertFirst(100)
// ll.insertFirst(200)
// ll.insertLast(400)
// console.log(ll)
// ll.printListData()


function circularLinkedList() {
    // Function to create Node
    let Node = function(data) {
        this.data = data;
        this.next = null;
    }

    let length = 0;
    let head = null;

    // Get element at specific index
    this.getElementAt = function(index) {
        if(index >= 0 && index <= length) {
            let node = head;
            for(let i = 0; i < index && node != null; i++) {
                node = node.next;
            }
            return node;
        }
        return undefined;
    }

    // Add new Node to the list
    this.add = function(data) {
        const node = new Node(data);
        let current;

        if(head === null) {
            head = node;
        } else {
            current = this.getElementAt(length - 1);
            current.next = node;
        }

        node.next = head; // This is how a circular linked list is formed because the last node points to the the head
        length++;
    }

    // Insert new Node to the list
    this.insert = function(data, index) {
        if (index >= 0 && index <= length) {
            const node = new Node(data)
            let current = head

            if(index === 0) {
                if(head === null) {
                    head = node
                    node.next = head 
                } else {
                    node.next = head
                    current = this.getElementAt(length)
                    head = node
                    current.next = head
                }
            } else {
                const previous = this.getElementAt(index - 1)
                node.next = previous.next
                previous.next = node
            }

            length++
            return true
        }
        return false
    }

    // Remove element at any position
    this.removeAt = function(index) {
        if(index >= 0 && index <= length) {
            let current = head

            if(index === 0) {
                if(length === 1) {
                    head = undefined
                } else {
                    const removed = head
                    current = this.getElementAt(length - 1)
                    head = head.next
                    current.next = head
                    current = removed // You want to return what node was removed
                }
            } else {
                const previous = this.getElementAt(index - 1)
                current = previous.next
                previous.next = current.next
            }

            length--
            return current.data
        }
        return undefined
    }

    // Print item
    this.toString = function() {
        let current = head
        string = ''

        const temp = head.data
        count = 0
        while(current) {
            if(temp === current.next.data) {
                string += current.data + (current.next ? '\n' : '')
                current = current.next
                count++
                if(count === 10) {
                    break
                }
            }
            string += current.data + (current.next ? '\n' : '')
            current = current.next
        }

        return string
    }
}
let ex = new circularLinkedList();
ex.add(22)
ex.add(23)
ex.add(24)
ex.add(25)
ex.add(26)

ex.insert(100, 2)

console.log(ex.toString())