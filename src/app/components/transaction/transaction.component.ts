import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import M from 'materialize-css';
import { Transaction } from 'src/app/models/forms/transaction';
import { TRANSACTION } from 'src/app/utils/enums/transaction.enum';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  public transactionForm: FormGroup;
  public title: string;
  public tag: string;
  public tags = [];
  public accounts = [
    'Bradesco',
    'NuBank',
    'PicPay'
  ];

  public isRecurrent = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    const currentTransaction = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);

    this.initForm(new Transaction());

    switch(currentTransaction) {
      case TRANSACTION.Add:
        this.title = 'Adicionar receita';
        break;
      case TRANSACTION.Remove:
        this.title = 'Adicionar despesa';
        break;
    }
  }

  private initForm(transaction: Transaction) {
    this.transactionForm = this.formBuilder.group({
      item: new FormControl(transaction.item),
      reason: new FormControl(transaction.reason),
      tag: new FormControl(transaction.tag),
      bank: new FormControl(transaction.bank),
      instalments: new FormControl(transaction.instalments),
      amount: new FormControl(transaction.amount),
      price: new FormControl(transaction.price),
    })
  }

  ngAfterViewInit(): void {
    setTimeout(function () {
      var elemsSelect = document.querySelectorAll('select');
      M.FormSelect.init(elemsSelect, null);
      var elems = document.querySelectorAll('.chips');
      M.Chips.init(elems, null);
    }, 0);
  }

  public onSubmit(): void {
    console.log(this.transactionForm.value);
  }

  public onTagChange(tagValue: string): void {
    if (tagValue[tagValue.length - 1] === ' ') {
      this.tags.push(tagValue.substring(0, tagValue.length - 1));
      this.tag = '';
    }
  }
}
