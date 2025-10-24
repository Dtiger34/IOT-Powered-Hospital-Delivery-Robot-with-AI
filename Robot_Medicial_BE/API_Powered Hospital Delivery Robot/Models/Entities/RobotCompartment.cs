﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace API_Powered_Hospital_Delivery_Robot.Models.Entities;

[Table("robot_compartments")]
[Index("RobotId", Name = "idx_comp_robot")]
[Index("RobotId", "CompartmentCode", Name = "uk_robot_compartment", IsUnique = true)]
[MySqlCollation("utf8mb4_unicode_ci")]
public partial class RobotCompartment
{
    [Key]
    [Column("id")]
    public ulong Id { get; set; }

    [Column("robot_id")]
    public ulong RobotId { get; set; }

    [Column("compartment_code")]
    [StringLength(8)]
    public string CompartmentCode { get; set; } = null!;

    [Column("status", TypeName = "enum('locked','unlocked')")]
    public string Status { get; set; } = null!;

    [Column("content_label")]
    [StringLength(255)]
    public string? ContentLabel { get; set; }

    [Required]
    [Column("is_active")]
    public bool? IsActive { get; set; }

    [InverseProperty("Compartment")]
    public virtual ICollection<CompartmentAssignment> CompartmentAssignments { get; set; } = new List<CompartmentAssignment>();

    [ForeignKey("RobotId")]
    [InverseProperty("RobotCompartments")]
    public virtual Robot Robot { get; set; } = null!;
}
