import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../core/services/message.service';
import { IMessage } from '../../core/models/message.model';
@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  name = '';
  email = '';
  subject = '';
  message = '';
  formMessage = '';
  constructor(private messageService: MessageService) {}
  sendMessage() {
    const data: IMessage = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };
    this.messageService.sendMessage(data).subscribe({
      next: () => {
        this.formMessage = 'Message sent successfully';
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      error: (error) => {console.log(error);
        this.formMessage = 'Something went wrong';
      }
    });
  }
}