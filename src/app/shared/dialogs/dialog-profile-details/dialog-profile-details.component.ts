import { Component, Inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { sReport } from '../../../services/sReport.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { Strategy } from '../../../interfaces/iStrategy';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-profile-details',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './dialog-profile-details.component.html',
  styleUrl: './dialog-profile-details.component.scss'
})
export class DialogProfileDetailsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value'];
  dataSource: any[];
  strategy: Strategy;
  reportTexts: any;

  constructor(
    public dialogRef: MatDialogRef<DialogProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sReport: sReport,
  ) {
    this.strategy = this.data.obj;
    let strategyData = this.transformToArrayOfKeyValue(this.data.obj);
    this.dataSource = strategyData.slice(3);
  }
  ngOnInit(): void {
    this.sReport.getReportTexts().subscribe(data => {
      this.reportTexts = data;
    });
  }

  private transformToArrayOfKeyValue(obj: Strategy) {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  }
}
